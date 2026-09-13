/**
 * João Maia — Nutricionista Clínico & Esportivo
 * Main Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inicializar Ícones Lucide
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Configurações Globais
  const CONFIG = {
    whatsappNumero: '5511976545184', // WhatsApp Oficial
    nomeProfissional: 'Dr. João Maia',
  };

  // 3. Controle do Menu Mobile
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // 4. Máscara de Telefone / WhatsApp Automática
  const telInput = document.getElementById('telefone');
  if (telInput) {
    telInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 11) value = value.slice(0, 11);

      if (value.length > 10) {
        value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
      } else if (value.length > 5) {
        value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
      } else if (value.length > 2) {
        value = value.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
      } else if (value.length > 0) {
        value = value.replace(/^(\d*)$/, '($1');
      }
      e.target.value = value;
    });
  }

  // 5. Accordion de Perguntas Frequentes (FAQ)
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Fecha todos os outros itens
        faqItems.forEach(other => {
          other.classList.remove('active');
          const otherContent = other.querySelector('.faq-content');
          const otherIcon = other.querySelector('i[data-lucide="chevron-down"]');
          if (otherContent) otherContent.classList.add('hidden');
          if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        });

        if (!isActive) {
          item.classList.add('active');
          const content = item.querySelector('.faq-content');
          const icon = item.querySelector('i[data-lucide="chevron-down"]');
          if (content) content.classList.remove('hidden');
          if (icon) icon.style.transform = 'rotate(180deg)';
        }
      });
    }
  });

  // 6. Formulário de Pré-Agendamento via WhatsApp
  const form = document.getElementById('agendamento-form');
  const feedbackBox = document.getElementById('form-feedback');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome = document.getElementById('nome')?.value.trim() || '';
      const telefone = document.getElementById('telefone')?.value.trim() || '';
      const objetivo = document.getElementById('objetivo')?.value || '';
      const modalidade = document.getElementById('modalidade')?.value || '';
      const mensagem = document.getElementById('mensagem')?.value.trim() || 'Gostaria de informações sobre valores e horários disponíveis.';

      if (!nome || !telefone || !objetivo) {
        if (feedbackBox) {
          feedbackBox.className = 'p-4 rounded-xl text-sm font-medium bg-rose-950/70 border border-rose-500/40 text-rose-300 block';
          feedbackBox.textContent = 'Por favor, preencha todos os campos obrigatórios (*).';
        }
        return;
      }

      const textoWhatsApp = 
`Olá ${CONFIG.nomeProfissional}! Meu nome é *${nome}* e gostaria de agendar uma consulta nutricional.

📌 *Objetivo Principal:* ${objetivo}
🏢 *Modalidade:* ${modalidade || 'Online / Presencial'}
📱 *Meu Contato:* ${telefone}
💬 *Detalhes:* ${mensagem}

Poderia me informar as datas e horários disponíveis para agendamento?`;

      const encoded = encodeURIComponent(textoWhatsApp);
      const url = `https://wa.me/${CONFIG.whatsappNumero}?text=${encoded}`;

      if (feedbackBox) {
        feedbackBox.className = 'p-4 rounded-xl text-sm font-medium bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 block';
        feedbackBox.innerHTML = `
          <p class="font-bold flex items-center gap-2">✅ Redirecionando para o WhatsApp de ${CONFIG.nomeProfissional}...</p>
          <p class="text-xs text-slate-300 mt-1">Caso o aplicativo não abra automaticamente, <a href="${url}" target="_blank" class="underline font-bold text-emerald-400">clique aqui para abrir</a>.</p>
        `;
      }

      setTimeout(() => {
        window.open(url, '_blank');
      }, 600);
    });
  }

  // 7. Navegação Suave para Links Internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
