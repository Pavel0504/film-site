import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface EmailRequest {
  type: "order" | "custom_disc";
  data: {
    name: string;
    contact: string;
    address?: string;
    items?: Array<{
      title: string;
      price: number;
      quantity: number;
    }>;
    total?: number;
    email?: string;
    comments?: string;
  };
}

function escapeHtml(s: string | undefined) {
  if (!s) return "";
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildHtml(type: EmailRequest["type"], data: EmailRequest["data"]) {
  if (type === "order") {
    return `
      <h2>Новый заказ</h2>
      <p><strong>Имя:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Контакт:</strong> ${escapeHtml(data.contact)}</p>
      ${data.address ? `<p><strong>Адрес доставки:</strong> ${escapeHtml(data.address)}</p>` : ""}
      <h3>Заказанные товары:</h3>
      <ul>
        ${data.items?.map((item) => `
          <li>${escapeHtml(item.title)} x ${item.quantity} = ${(item.price * item.quantity).toLocaleString("ru-RU")} р.</li>
        `).join("")}
      </ul>
      <p><strong>Итоговая сумма: ${data.total?.toLocaleString("ru-RU")} р.</strong></p>
    `;
  } else {
    return `
      <h2>Запрос на создание индивидуального диска</h2>
      <p><strong>Email:</strong> ${escapeHtml(data.email ?? "")}</p>
      <p><strong>Имя:</strong> ${escapeHtml(data.name)}</p>
      ${data.comments ? `<p><strong>Комментарии:</strong><br>${escapeHtml(data.comments).replace(/\n/g, "<br>")}</p>` : ""}
    `;
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { type, data }: EmailRequest = await req.json();

    const subject = type === "order"
      ? "Новый заказ с сайта FILMS HDD"
      : "Запрос на создание индивидуального диска";

    const htmlBody = buildHtml(type, data);
    const textPreview = (type === "order")
      ? `Новый заказ — Имя: ${data.name}; Контакт: ${data.contact}; Итого: ${data.total ?? ""}`
      : `Запрос на диск — Имя: ${data.name}; Email: ${data.email ?? ""}`;

    // Заглушка: логируем и возвращаем успешный ответ, ничего не отправляя
    console.log("[EMAIL STUB] subject:", subject);
    console.log("[EMAIL STUB] textPreview:", textPreview);
    console.log("[EMAIL STUB] htmlBody:", htmlBody);

    return new Response(
      JSON.stringify({
        success: true,
        via: "stub",
        subject,
        preview: textPreview,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Stub handler error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
