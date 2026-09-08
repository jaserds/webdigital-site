(() => {
 const cards=[...document.querySelectorAll('.aho-screen-card')];
 const filters=[...document.querySelectorAll('[data-filter]')];
 const status=document.querySelector('.aho-gallery-status');
 const dialog=document.querySelector('.aho-lightbox');
 const image=dialog.querySelector('img');
 const title=document.querySelector('#aho-dialog-title');
 const count=document.querySelector('#aho-dialog-count');
 let current=0;
 cards.forEach(card=>card.id='screen-'+card.querySelector('[data-screen]').dataset.screen);
 const visible=()=>cards.filter(card=>!card.hidden);
 function filter(category){
  cards.forEach(card=>card.hidden=category!=='all'&&card.dataset.category!==category);
  filters.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter===category)));
  status.textContent=`Экранов в разделе: ${visible().length}`;
 }
 filters.forEach(button=>button.addEventListener('click',()=>filter(button.dataset.filter)));
 function show(index){
  const list=visible();current=(index+list.length)%list.length;
  const card=list[current];const source=card.querySelector('img');
  image.src=source.src;image.alt=source.alt;
  title.textContent=card.querySelector('h3').textContent;
  count.textContent=`${current+1} / ${list.length}`;
  dialog.querySelector('.aho-lightbox-image').scrollTo(0,0);
 }
 cards.forEach(card=>card.querySelector('button').addEventListener('click',()=>{
  show(visible().indexOf(card));dialog.showModal();document.body.style.overflow='hidden';
 }));
 dialog.querySelector('.aho-close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('close',()=>document.body.style.overflow='');
 dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
 dialog.querySelector('[data-lightbox-prev]').addEventListener('click',()=>show(current-1));
 dialog.querySelector('[data-lightbox-next]').addEventListener('click',()=>show(current+1));
 dialog.addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();show(current+1);}if(event.key==='ArrowLeft'){event.preventDefault();show(current-1);}});
 document.querySelector('[data-jump-screen]').addEventListener('click',()=>filter('all'));
})();
