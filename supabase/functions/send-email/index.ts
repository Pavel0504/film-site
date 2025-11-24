import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface EmailRequest {
  type: 'order' | 'custom_disc';
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

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { type, data }: EmailRequest = await req.json();

    let emailBody = '';
    let subject = '';

    if (type === 'order') {
      subject = 'Новый заказ с сайта FILMS HDD';
      emailBody = `
        <h2>Новый заказ</h2>
        <p><strong>Имя:</strong> ${data.name}</p>
        <p><strong>Контакт:</strong> ${data.contact}</p>
        ${data.address ? `<p><strong>Адрес доставки:</strong> ${data.address}</p>` : ''}
        
        <h3>Заказанные товары:</h3>
        <ul>
          ${data.items?.map(item => `
            <li>${item.title} x ${item.quantity} = ${(item.price * item.quantity).toLocaleString('ru-RU')} р.</li>
          `).join('')}
        </ul>
        
        <p><strong>Итоговая сумма: ${data.total?.toLocaleString('ru-RU')} р.</strong></p>
      `;
    } else if (type === 'custom_disc') {
      subject = 'Запрос на создание индивидуального диска';
      emailBody = `
        <h2>Запрос на создание индивидуального диска</h2>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Имя:</strong> ${data.name}</p>
        ${data.comments ? `<p><strong>Комментарии:</strong><br>${data.comments.replace(/\n/g, '<br>')}</p>` : ''}
      `;
    }

    // Using Resend API for sending emails
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    if (!resendApiKey) {
      // Fallback: just log the email content if no API key
      console.log('Email would be sent:', { subject, emailBody });
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Order received (email not configured)' 
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'FILMS HDD <onboarding@resend.dev>',
        to: ['zudinpavel99@gmail.com'],
        subject: subject,
        html: emailBody,
      }),
    });

    if (!res.ok) {
      throw new Error(`Failed to send email: ${res.statusText}`);
    }

    const responseData = await res.json();

    return new Response(
      JSON.stringify({ success: true, data: responseData }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});