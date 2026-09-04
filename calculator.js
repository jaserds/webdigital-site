(() => {
  const root = document.querySelector('[data-calculator]'); if (!root) return;
  const types = { landing:{name:'Лендинг',price:30000,min:7,max:10}, store:{name:'Интернет-магазин',price:68000,min:21,max:28} };
  const money = new Intl.NumberFormat('ru-RU');
  const price = root.querySelector('[data-total-price]'), minDays = root.querySelector('[data-total-days]'), maxDays = root.querySelector('[data-total-days-max]'), list = root.querySelector('[data-result-list]');
  function update(){const selected=root.querySelector('input[name="site-type"]:checked');const type=types[selected?.value||'landing'];const extras=[...root.querySelectorAll('input[type="checkbox"]:checked')];const extraPrice=extras.reduce((s,i)=>s+Number(i.dataset.price),0);const extraDays=extras.reduce((s,i)=>s+Number(i.dataset.days),0);price.textContent=`${money.format(type.price+extraPrice)} ₽`;minDays.textContent=type.min+extraDays;maxDays.textContent=type.max+extraDays;list.replaceChildren(...[type.name,...extras.map(i=>i.dataset.name)].map(name=>{const item=document.createElement('li');item.textContent=name;return item}));if(!matchMedia('(prefers-reduced-motion: reduce)').matches)price.animate([{opacity:.25,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:280,easing:'ease-out'});}
  root.addEventListener('change',update);update();
})();
