import{g,e as $}from"./el-Ck1fTNYl.js";const _=["/","/en","/en/characters","/en/rules","/en/team","/en/contact","/en/news","/el","/el/characters","/el/rules","/el/team","/el/contact","/el/news"],c={en:{characters:"Characters and Lore",rules:"Game Rules",team:"The Team",contact:"Contact You Are Up Next",news:"News",home:"Frequently Asked Questions"},el:{characters:"Χαρακτήρες και Ιστορία",rules:"Κανόνες Παιχνιδιού",team:"Η Ομάδα",contact:"Επικοινωνία με το ΕΙΣΑΙ Ο ΕΠΟΜΕΝΟΣ",news:"Νέα για το ΕΙΣΑΙ Ο ΕΠΟΜΕΝΟΣ",home:"Συχνές Ερωτήσεις"}};function t(o){return o.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function w(o){return o.replace(/<[^>]*>/g,"")}function d(o){return o.split("/").filter(Boolean)[1]||"home"}function y(o,n){const e=o.replace(/^\/(en|el)(?=\/|$)/,"")||"/";return`/${n}${e==="/"?"":e}`}function b(o,n){const e=n==="el"?g:$,r=d(o),l=r==="home"?"homeTitle":`${r}Title`,u=r==="home"?"homeDescription":`${r}Description`,m=e.meta[l]||e.meta.homeTitle,s=e.meta[u]||e.meta.homeDescription,h=c[n][r]||c[n].home,i=n==="el"?"/el":"/en";let a=`<h2>${t(h)}</h2><p>${t(s)}</p>`;return r==="home"?a=`
      <h2>${t(e.home.title)}</h2>
      <p>${t(e.home.seo_description)}</p>
      <h2>${t(e.faq.title)}</h2>
      <p>${t(e.faq.description)}</p>
    `:r==="characters"?a=Object.values(e.characters).map(p=>`
          <section>
            <h2>${t(p.name)}</h2>
            <p>${t(w(p.description))}</p>
          </section>
        `).join(""):r==="rules"?a=`
      <h2>${t(e.rules.header_title)}</h2>
      <p>${t(e.rules.header_subtitle)}</p>
      <h2>${t(e.rules.components.title)}</h2>
      <p>${t(e.rules.components.subtitle)}</p>
      <h2>${t(e.rules.purpose_title)}</h2>
      <p>${t(w(e.rules.purpose_text1))}</p>
      <p>${t(w(e.rules.purpose_text2))}</p>
    `:r==="team"?a=["dold","sergis","mat","kat"].map(p=>`
          <section>
            <h2>${t(e.team[`${p}_name`])}</h2>
            <p>${t(e.team[`${p}_role`])}</p>
          </section>
        `).join(""):r==="contact"?a=`
      <h2>${t(e.contact.title)}</h2>
      <p>${t(s)}</p>
      <p>${t(e.contact.button)}</p>
    `:r==="news"&&(a=`
      <h2>${t(e.news.latest_title)}</h2>
      <ul>${e.news.latest_items.map(p=>`<li>${t(p)}</li>`).join("")}</ul>
      <h2>${t(e.dailyFact.title)}</h2>
      <p>${t(e.dailyFact.items[0])}</p>
    `),`
    <main aria-label="${t(m)}">
      <h1>${t(m)}</h1>
      <p>${t(s)}</p>
      <nav aria-label="${n==="el"?"Κύρια πλοήγηση":"Main navigation"}">
        <a href="${i}">${n==="el"?"Αρχική":"Home"}</a>
        <a href="${i}/news">${c[n].news}</a>
        <a href="${i}/characters">${c[n].characters}</a>
        <a href="${i}/rules">${c[n].rules}</a>
        <a href="${i}/team">${c[n].team}</a>
        <a href="${i}/contact">${c[n].contact}</a>
      </nav>
      ${a}
    </main>
  `}async function k({url:o}){const n=new URL(o,"https://www.youareupnext.gr").pathname,e=n.startsWith("/el")?"el":"en",r=e==="el"?g:$,l=d(n),u=l==="home"?"homeTitle":`${l}Title`,m=l==="home"?"homeDescription":`${l}Description`,s=r.meta[u]||r.meta.homeTitle,h=r.meta[m]||r.meta.homeDescription,a=`https://www.youareupnext.gr${y(n,e)}`,p=`https://www.youareupnext.gr${y(n,"en")}`,f=`https://www.youareupnext.gr${y(n,"el")}`,x={"@context":"https://schema.org","@graph":[{"@type":"WebSite","@id":"https://www.youareupnext.gr/#website",url:"https://www.youareupnext.gr",name:"You Are Up Next",inLanguage:e},{"@type":"WebPage","@id":`${a}#webpage`,url:a,name:s,description:h,inLanguage:e,isPartOf:{"@id":"https://www.youareupnext.gr/#website"},about:{"@id":"https://www.youareupnext.gr/#game"}},{"@type":"BoardGame","@id":"https://www.youareupnext.gr/#game",name:"You Are Up Next",url:p,description:r.meta.homeDescription,image:"https://www.youareupnext.gr/social-share-v2.png",genre:["Strategy","Card game","Medieval game"],isPartOf:{"@id":"https://www.youareupnext.gr/#website"}}]};return{html:b(n,e),links:new Set(_),head:{lang:e,title:s,elements:new Set([{type:"meta",props:{name:"description",content:h}},{type:"meta",props:{name:"robots",content:"index, follow"}},{type:"meta",props:{property:"og:type",content:"website"}},{type:"meta",props:{property:"og:site_name",content:"You Are Up Next"}},{type:"meta",props:{property:"og:locale",content:e==="el"?"el_GR":"en_US"}},{type:"meta",props:{property:"og:title",content:s}},{type:"meta",props:{property:"og:description",content:h}},{type:"meta",props:{property:"og:image",content:"https://www.youareupnext.gr/social-share-v2.png"}},{type:"meta",props:{property:"og:image:width",content:"1200"}},{type:"meta",props:{property:"og:image:height",content:"630"}},{type:"meta",props:{property:"og:image:type",content:"image/png"}},{type:"meta",props:{property:"og:url",content:a}},{type:"meta",props:{name:"twitter:card",content:"summary_large_image"}},{type:"meta",props:{name:"twitter:title",content:s}},{type:"meta",props:{name:"twitter:description",content:h}},{type:"meta",props:{name:"twitter:image",content:"https://www.youareupnext.gr/social-share-v2.png"}},{type:"link",props:{rel:"canonical",href:a}},{type:"link",props:{rel:"alternate",hrefLang:"en",href:p}},{type:"link",props:{rel:"alternate",hrefLang:"el",href:f}},{type:"link",props:{rel:"alternate",hrefLang:"x-default",href:p}},{type:"script",props:{type:"application/ld+json",children:JSON.stringify(x)}}])}}}export{k as prerender};