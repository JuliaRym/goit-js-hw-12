import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{a as S,i as c,S as L}from"./assets/vendor-Dp7Ig4E2.js";const b="46256747-1d18669c2152ad7d06c950e83",w="https://pixabay.com/api/",d=document.querySelector(".search-form"),y=document.querySelector(".gallery"),t=document.querySelector(".load-more");function q(e){return`
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
  `}function g(){document.querySelector(".loading-spinner").style.display="block"}function u(){document.querySelector(".loading-spinner").style.display="none"}const h=40;let o=1,s="",p=0;function M(e,n){const a=new URLSearchParams({key:b,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:h,page:n});return`${w}?${a.toString()}`}function $(e){const n=e.map(a=>q(a)).join("");y.insertAdjacentHTML("beforeend",n)}function k(){new L(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}function I(){t.style.display="block"}function r(){t.style.display="none"}async function f(e,n){try{g();const a=M(e,n),i=await S.get(a);u();const l=i.data.hits;if(p=i.data.totalHits,l.length===0){c.error({message:"Sorry, there are no images matching your search query. Please try again!"});return}$(l),k(),n*h<p?I():(r(),c.info({message:"We're sorry, but you've reached the end of search results."})),m()}catch(a){console.log(a),u(),m()}}d.addEventListener("submit",e=>{e.preventDefault(),s=d.querySelector(".search-input").value.trim(),o=1,y.innerHTML="",r(),g(),f(s,o)});const v=document.querySelector(".loading-spinner-more");function x(){v.style.display="block"}function m(){v.style.display="none"}t.addEventListener("click",async()=>{r(),o+=1,x();try{await f(s,o),E()}catch(e){console.log(e)}});function E(){const e=document.querySelector(".gallery-item");if(e){const n=e.getBoundingClientRect().height;window.scrollBy({top:n*2,behavior:"smooth"})}}
//# sourceMappingURL=search.js.map
