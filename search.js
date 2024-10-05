import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{a as v,i as l,S}from"./assets/vendor-Dp7Ig4E2.js";const L="46256747-1d18669c2152ad7d06c950e83",b="https://pixabay.com/api/",c=document.querySelector(".search-form"),m=document.querySelector(".gallery"),t=document.querySelector(".load-more");function q(e){return`
    <div class="gallery-item">
      <a href="${e.largeImageURL}">
        <img class="gallery-img" src="${e.webformatURL}" alt="${e.tags}" />
      </a>
      <div class="div-info">
        <div class="img-info">
        <span class="name">Likes</span>
        <span class="value">${e.likes}</span>
        </div>
        <div class="img-info">
        <span class="name">Views</span>
        <span class="value">${e.views}</span>
        </div>
        <div class="img-info">
        <span class="name">Comments</span>
        <span class="value">${e.comments}</span>
        </div>
        <div class="img-info">
        <span class="name">Downloads</span>
        <span class="value">${e.downloads}</span>
        </div>
      </div>
    </div>
  `}function y(){document.querySelector(".loading-spinner").style.display="block"}function d(){document.querySelector(".loading-spinner").style.display="none"}const g=40;let n=1,o="",u=0;function w(e,a){const s=new URLSearchParams({key:L,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:g,page:a});return`${b}?${s.toString()}`}function $(e){const a=e.map(s=>q(s)).join("");m.insertAdjacentHTML("beforeend",a)}function k(){new S(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}async function f(e,a){try{y();const s=w(e,a),r=await v.get(s);d();const i=r.data.hits;if(u=r.data.totalHits,i.length===0){l.error({message:"Sorry, there are no images matching your search query. Please try again!"});return}$(i),k(),a*g<u?t.style.display="block":(t.style.display="none",l.info({message:"We're sorry, but you've reached the end of search results."})),p()}catch(s){console.log(s),d(),p()}}c.addEventListener("submit",e=>{e.preventDefault(),o=c.querySelector(".search-input").value.trim(),n=1,m.innerHTML="",y(),f(o,n)});const h=document.querySelector(".loading-spinner-more");function M(){h.style.display="block"}function p(){h.style.display="none"}t.addEventListener("click",()=>{n+=1,M(),f(o,n)});
//# sourceMappingURL=search.js.map
