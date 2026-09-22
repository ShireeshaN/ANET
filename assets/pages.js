window.ANET={ $:s=>document.querySelector(s), $$:s=>[...document.querySelectorAll(s)] };

        (() => {
            'use strict';
            const { $, $$ } = window.ANET;
            const header = $('#header'), menu = $('#menuToggle'), trigger = $('#solutionsTrigger'), mega = $('#solutionsMenu');
            function closeNav() { header.classList.remove('menu-open'); menu.setAttribute('aria-expanded', 'false'); menu.textContent = 'Menu +'; closeMega() }
            function closeMega() { mega.hidden = true; trigger.setAttribute('aria-expanded', 'false') }
            menu.addEventListener('click', () => { const open = header.classList.toggle('menu-open'); menu.setAttribute('aria-expanded', String(open)); menu.textContent = open ? 'Close ×' : 'Menu +'; if (!open) closeMega() });
            trigger.addEventListener('click', () => { mega.hidden = !mega.hidden; trigger.setAttribute('aria-expanded', String(!mega.hidden)) });
            document.addEventListener('click', e => { if (!e.target.closest('.solutions')) closeMega() }); document.addEventListener('keydown', e => { if (e.key === 'Escape') { if (!mega.hidden) { closeMega(); trigger.focus() } else if (header.classList.contains('menu-open')) { closeNav(); menu.focus() } } });
            $('#navLinks').addEventListener('click', e => { if (e.target.closest('a')) closeNav() });
            addEventListener('resize', () => { if (innerWidth > 760 && header.classList.contains('menu-open')) closeNav() });
            const syncNav = () => header.classList.toggle('scrolled', scrollY > 25); syncNav(); addEventListener('scroll', syncNav, { passive: true });
        })();
    
document.querySelector('#year').textContent=new Date().getFullYear();
const scenes=document.querySelector('#sceneData');if(scenes){const data=JSON.parse(scenes.textContent);document.querySelectorAll('[data-mode]').forEach(btn=>btn.addEventListener('click',()=>{const i=Number(btn.dataset.mode);document.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));document.querySelector('.scene-display').dataset.scene=i;document.querySelector('#sceneTitle').textContent=data[i][0];document.querySelector('#sceneCopy').textContent=data[i][1]}))}
const form=document.querySelector('#enquiryForm');if(form){const service=new URLSearchParams(location.search).get('service');if([...form.service.options].some(o=>o.value===service))form.service.value=service;form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const f=new FormData(form);const serviceName=form.service.selectedOptions[0].textContent;const text=`Name: ${f.get('name')}
Email: ${f.get('email')}
Phone: ${f.get('phone')||'Not supplied'}
Location: ${f.get('location')}
Solution: ${serviceName}

${f.get('message')}`;document.querySelector('#emailDraft').value=text;document.querySelector('#emailFallback').hidden=false;document.querySelector('#formStatus').textContent='Email draft prepared. Please review and send it in your email application.';location.href='mailto:info@aniplgroup.com?subject='+encodeURIComponent('Project enquiry — '+serviceName)+'&body='+encodeURIComponent(text)});document.querySelector('#copyEnquiry').addEventListener('click',async()=>{const t=document.querySelector('#emailDraft');try{await navigator.clipboard.writeText(t.value);document.querySelector('#formStatus').textContent='Enquiry copied. Paste it into your email.'}catch(e){t.focus();t.select();document.querySelector('#formStatus').textContent='Select and copy the prepared enquiry.'}})}
