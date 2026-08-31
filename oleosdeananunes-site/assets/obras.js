/* =========================================================================
   Óleos de Ana Nunes — motor da galeria (partilhado por todas as páginas)

   As obras vêm do feed do blogue oleosdeananunes.blogspot.com, lido em cada
   visita. A Ana publica lá o quadro novo e ele aparece no site sozinho.
   A lista FALLBACK abaixo só entra em cena se o blogue estiver inacessível.

   Endereços das imagens: usamos exactamente os que o Blogger publica —
   o <a href> do post (tamanho nativo) e o <img src> (miniatura). Nunca
   inventamos um tamanho, porque um /s1600/ inventado pode devolver 404.

   Uso numa página:
     <div id="galeria" data-modo="galeria" data-por-pagina="12"></div>
     <div id="galeria" data-modo="destaque" data-limite="6"></div>
   ========================================================================= */
(function(){
'use strict';

var VERSAO = '2026-08-26.3';
var BLOG = 'oleosdeananunes.blogspot.com';
try{ console.log('Óleos de Ana Nunes — galeria versão '+VERSAO); }catch(e){}

var FALLBACK = [
 {t:"Bordadeira de Arraiolos",m:"Óleo sobre tela",y:2023,img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhiu1V4P9pGAyJIWpwrrkC3ZhaGO9rPwmL5rz7Y2l0OXM2ggjqSSsYaBoZgM8aQh4Ei-CksYsJAfWxc77mx7WJw8ywUWxWVdX0gMjdv-4TD6cBCg1XY6IIEE0DGp_hiikXWol4eJyvgOALdCQH5SwhIhcUDK0CZOD19Mpl2z79BrtgVcu8z1kBV7A/s320/20231001_103212.jpg"},
 {t:"Trago o Alentejo nas Mãos",m:"Óleo sobre tela",y:2023,img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgJJjBn1UI61yIWoIBIMM_Hysl4nMO1vGSphN1GiXnvpjBoqJSn_Xaa_xb5j8h3YtF2En-RsXz4h4kLenf_HXrFOaTOgqOx32TjHPgqowr8ZchLnw5OYIZI77vljzkF2PVUiAtEGyWWxWH8Em_gqBVeUrWAbCo2GIVdDlVGP7xlCLCH9BJ8Mk3jhQ/s320/Trago%20o%20Alentejo%20nas%20m%C3%A3os.jpg"},
 {t:"Quem disse que não tem amor?!",m:"Óleo sobre tela",y:2023,img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEggnqVbp1RQBw9NgT38C8QnPIaTwERfn3ajDeBqsOqhrbNH8R-fhS9xj9ehCJGF97je3tD0maSXOsgcDajofxSpcmLOaH3yWpWGoiJIRIGOZxlE8Jupt3lezTfQ8aMNzbbm7SJdhv0nlyJdKgN_zaegjLXA5lv2mgLD38Lj3m7XLOxs3pqfQg0/s320/Quem%20disse%20que%20n%C3%A3o%20tem%20amor!.jpg"},
 {t:"Domingo",m:"Óleo sobre tela",y:2023,img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhfNl4ZV8Gx4ZQyaDJPv9xAKPbT3cUoJAKHyIgE-mdm1rqeEgsNxH6BFdk7Ao28kxS04gs4mL_yFf5fD9vv3XvI7PgL7zjx-DMPAC2_MlBjgNjKc0KwwHfsYBcu-dJ5OR4l8EXn13YVBRGejzVYeweDWf83TYLhm3CYE_QTu7LW8DxrO5toYOQ/s320/Domingo.jpg"},
 {t:"Um pouco de carmim",m:"Óleo sobre tela",y:2023,img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhCD-eY_wTHeF7SWuUqkBW3uut-RNWjOAeUWPOu7TA3o4yQv7I5rKn4glX_Lu3H5r5xAm23rL9C-QC74Y2uqL9VT88hxYh1dJTSXlxaysU29aDBZszpVBcAhDnfp05iB1ZwR8OxJYUaxrT34WVpv28acS2CsV43TafwCjz-tc0C22jiarSFZyM/s320/Um%20pouco%20de%20carmim.jpg"},
 {t:"De luz e sombra",m:"Óleo sobre tela",y:2023,img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhz9Ab4dG2bmqlw4gVcnNRbe-A3yy384RDe7wjhhkJ6DPNhzVqCN-pSiasdxDOFH91qLxXP-Wb-9zo-QYy8ewNB5o-BcQ9aPLER6D-8Kntots6DfQ470fgfXYfEq750E4MxiX9j3kV6mTVb9iBnYS5C5zf63kX1PVM76-ayre5D56i-KHn-rbo/s320/De%20azul%20e%20sombra.jpg"},
 {t:"A beleza que tem, ver a vida acontecer",m:"Óleo sobre tela",y:2023,img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiLW5Jb4BGlyYfEVcsdTRCsGWg2Qj0-zKYBmcxmjhITMHjRz5IYV_l-prxgEa3yyTSG-x8lKkuJTSwKFucm7BEoTxcoEx4gsUsA34bWar1U7cLrw6_XfZvZ4IF0-tP32KdXS9gXAdvQxRzia1RcJQ9LvYqjlJDxU19382q2BSvpHlz1pJQdA_0/s320/20230416_183555.jpg"},
 {t:"Venho-lhe dar um raminho",m:"Óleo sobre tela",y:2023,img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEigJPT0mxEmP5LgNSCvJHQOqfcFtBvfzJp3HlX2nZyu9KjjbNN9OD7enqdrg6O17m0NUvSuyx-ceasTaW7B3xXqSFU_RVHhHuZrdbu7txCNhdBsTpmSwyXWj8Ojeraph5T6thG4OIu1vzz8togdnDZt8QeqH2WAQJtXGya23OLTIEpEIn65utM/s320/Venho-lhe%20dar%20um%20raminho.jpg"},
 {t:"As Marias",m:"Óleo sobre tela",y:2023,img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiYaMy-Rlg-QjD_qZab44Y4P4-P5WBnSsjlHbcVGdDDM3dUaBRVqNsbZfLeNrqmqAKtHLr_gZCIocdA1OUgcW7Rej8Hm3OR5IIh1r0kytcVoJfhz5CvxLRZ7OxHI0WwB_jB1-GB5mNhRJlxIyLBE2vc0cyRQWgTBDcP703xg34uoXse3-yG9dU/s320/20230417_183610.jpg"},
 {t:"Pausa",m:"Óleo sobre tela",y:2023,img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiw4lDFJjE4CsEBhiytD_wHH-PE2lCGnAsxJBRG2fzsR1i3ZajZQl-qRs81Jh_-KiVQZBg26RS2RlTVzHbcho-P4uAsYlSdpnFfcRyJF8gduM9avhc-cFjI8JCZqxPs0GuBECQ6JRoZGDZrKXoArWggfgK2nf6rr5-IFmyY6ptJRFZ1q3xWnTw/s320/20230401_101114.jpg"},
 {t:"Cores de Outono",m:"Óleo sobre tela",y:2022,img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiTViYp5V2rd9W9AnWgSe_BYL3GdVEBUwAcBF0n46NyEm0_6Qbo7iGBOEvjc_zWunp5fowv1zkP1xv2ONR_gNmI_tWCwD_lVHrZwzbEQq6fBHyxTOcQPZGAEK8pbssM2HEESLYoTVXEb11eaaOafe2LqrAd2bKm7QMAjIwdptYAuSFfAjO8JVo/s320/IMG_20221001_105903_961.jpg"},
 {t:"Retrato de gato",m:"Óleo sobre tela",y:2022,img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhsA-8CRliyxM2cyJBnD8qPVLCME1ZAKppsx2-KkkXdO1u9whwT8FlRup5FiEOmVTuOj83xJ3ghtTOGYMqWdgQI9o7RI4BzWX692y0I5hW_7zx7Ip2QZeOBGcavCzcGsi6eoIE21EdCw5Ivf3iCYyW0Afc19bQjIilNZbSEwOLykY5C-aClaWM/s320/IMG_20221009_185840_130.jpg"},
 {t:"Fado, sobre original de José Malhoa",m:"Óleo sobre tela",y:2022,img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgAksk0-BNcZClUGzLylIoS5aL0Ru0wOl95o1yW1ClenuwIcQweRo6pDlKFN3ncv8bPAGns39ztgo2qYeTSVspzdj8q1_ADn2LFeEKH7r_Y3umHX-o48e2E48uKSKAVMhKh1lRUvZ0kUexExFEnCpGzZ5DWzQlB2rIIUp8jg0zqh8j1eIg5lWs/s320/IMG_20220105_172757_683.jpg"},
 {t:"Santo António",m:"Óleo sobre tela",y:2022,img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgzppqldAH7Nvcd0PZqQZzE-qeQF7YUzJ6Qng8_kpUk9Q13jsY2xFeLpEtit68vBj4pfFUvJlonxQp9Z-nh-Y8KdM7oHRaYCyYuN9_KPT3rysFwb5z_pN3j0cXiZQiziuSPZb9pofzeqBf8URQ8gwEVpQHaSYMBfnKkLCLwga5yfIvgmSeWUuw/s320/IMG_20220828_173908_198.jpg"},
 {t:"Arcanjo Miguel",m:"Óleo sobre tela",y:2022,img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhabnf4SVSGsUwatrcmI8A_QolsyxMaa9n4ari0dg4wVCc6RU9W_E4lUfAu7mTMsZbJt9PtvtMIqvbO11wQvgVaVNjH4qWDCM35gQvHNpgNOOXOCnG5sidpLExvr48cXD-kmVQHLlbet3zgT2ru723-bdJiTheonhK-8f6lP7_soScF4bljZ2g/s320/IMG_20220820_135440_931.jpg"},
 {t:"Doce espera",m:"Óleo sobre tela",y:2022,img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhfRjT-B0PAjMh25LaBYMUNRMVpnCMKUQeB8SS8fCi8OSGnN3uEhvaYvaFIIfVTuo_O01HQ5-uwn8-82sM1cqJsLi5vhCMq0PVAjt8abGgCTesvCyMU5UcHAuraqK-u4MTbAfmDmh4IZOclaik52MDBwRyyB0a5fCBIZSa_KAocBv0f_miKA-g/s320/IMG_20220514_155122_222.jpg"},
 {t:"Poesia",m:"Óleo sobre tela",y:2022,img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi5RUpofxeBC0j-9gyQL3uIWYa1UWPkZ3Cj9fx2LHi8k6v3iWRR5-cyQ_Ew9BFMmfLUmfky9ze7rzccNJwjC2UXgfYcVJI03ROLgE2qTZRm7Bix1OZ-DhaXl9-GTazfMjtBNn3ZwQj3GQ6wr_L7bQxS8HzSBwt3ikVk7ZoWPDdEMCdWXANe8aY/s320/IMG_20220410_203929_448.jpg"},
 {t:"A grandeza não é eu nunca ter caído… é ter-me levantado sempre",m:"Óleo sobre tela",y:2022,img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh2CenzVCUsuVWFPAMTXrHPmVcfnl2FBzBYeYvaRY1ag_b6UEfqS5_lhn7gNV6mwT4dHfeMmmJ8R1FJLbTPa62gWNDHPG0phmk36oBVkoDVLt7_ONS-Zq6ZHZLszdlhHHttlaP2A3-h06EKYOdpUjICd5dGicuANESC-790z91SaqpRyWB-IEg/s320/IMG_20220121_213413_292.jpg"},
 {t:"Santo António",m:"Óleo sobre tela",y:2022,img:"https://blogger.googleusercontent.com/img/a/AVvXsEh-XVa-GhN6NdxH0pZFppasWTPld2krlI511_z_w_wZsBDG0nbtsvO9Cl0BjeY0MJ8mWYtOQj6Ye9uZsq_3a7rlAh7Xb-Z74hxQ6Nvh93qYAgdV3lboxsKozb1WEIbZLQJC-3HM2UR62q7gjmLOJAgicopnuHPPEJwUe2lo2ovSd7Mr99C1Ykg=s320"},
 {t:"Retrato",m:"Óleo sobre tela",y:2022,img:"https://blogger.googleusercontent.com/img/a/AVvXsEgOxsHR4N8RaVmQu_TybHpGk-upL9E1GM19FRac4oikwaLBDsbKLYhHEz9mkyjXy39_oEUsLit_2ugF6up4ksyyPNS7umg3lRn2Xi46Uwnwa00hbUg5rnv8mvCo-2zkfdTvbhe9sXnK2JVtG65RqtwifUpWCltUV4_Byee-2UqBXc3IxlHkR30=s320"},
 {t:"Ilustração / Retrato",m:"Óleo sobre papel",y:2022,img:"https://blogger.googleusercontent.com/img/a/AVvXsEhB63PbfrxY9lfKUz0x-KqEdWI2I1OdEdEUroFTwL2pCZAsjP7y4rm1NEXwNDaEEfOBttQm1I9F6X6uD7SOPFsXzLF1DHA4gFvtsg5evrfArN8_wpZSlQfDOcD8TGkQrGxPRX2g1YOkQevDtQIT69r8ITy13FoW82bDTQsV6smvtGCCPva8dwU=s320"},
 {t:"Nossa Senhora do Rosário",m:"Ilustração",y:2022,img:"https://blogger.googleusercontent.com/img/a/AVvXsEjXXNUscwYRe1i358fro-U8AgYsgM7tjgy2fRPf-IM8i9zxsrhTF8DepnJQ43_TgrqPEGdnaGqnm8mXqsZ5SQsNVhnS4Zh4YOclYB4I9ordz5kX7MdjesG2UfVypfzQjH1Uu2muZzT5m19KESmpDpCwQsNmIQ7RBz0B89v2LCfUu0Oah1MXBkQ=s320"},
 {t:"Retrato infantil",m:"Óleo sobre papel",y:2022,img:"https://blogger.googleusercontent.com/img/a/AVvXsEgFMUV1T1AiBfwVXlb6TE_gRsmvBp9dn8Xzp8WEWVwkKPqx3bBSI2y9u-qb9brBMaTFfmixkmBw8gugv_C5VwneEy0eVQz-FVHHN0FW68e5e0rk4-QZPXRmIxx3i0gwLoq5kluSPNnEdcbkmMUHJfVdhDegunthBl1UHPHGTAycKvXt-YEA12k=s320"},
 {t:"Retrato",m:"Óleo sobre tela",y:2022,img:"https://blogger.googleusercontent.com/img/a/AVvXsEgOk9VDNNet_E_hm_M7WvyfnzofKNHYj31O9CSoU4K9v6MmlvCctdDI0PpmqpU2-FQvvwOp_xdt0FryA3albAt8i2zXGSkeRN2VlRqSa0HnF-H9vowxG43DoGqjLW03k28Vk-VU7jQb7jLwxLhdyuDM0BbPFTjkCHAnRE7fTM8233UW6hHxgoM=s320"},
 {t:"Ilustrações",m:"Óleo sobre papel",y:2021,img:"https://blogger.googleusercontent.com/img/a/AVvXsEihV6mupFV8dkxmTx1t2h_ZnVM-garjjbltu0gKKroD9o204TgIhARX9LfMc6ZGv4IbXYI4dRG-F3QrrHEx--H8i620IjxlqAEyTX8MJIjHBvszKSFus8ldrGPHw2QhV7OFevY5Ta1lXdTTr2FrqdXNRp107kPWg1ZOigl9ufMht4vu79GwQ9Y=s320"},
 {t:"Trigacheiro",m:"Óleo sobre papel",y:2021,img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhXxcOsd1OC8vRxQx8fWfAkCzC7jp32CtRxROOE4qRFtxuqM_l6FntbrMbBpKMA4RimMBViTCt3B99fVMaurTlCEANON91mrFqLPmFV2ujU2iH8z6rVXCSK-Ygftv0dYUlp1G1opw/s320/Trigacheiro.jpg"},
 {t:"Um pouco de verde, um pouco de esperança",m:"Óleo sobre papel",y:2021,img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjIYcOLjtV4Rvt-tfRbWA-eiU4HvkJOy6ANXY7hHc3aB6ia3GV59LEBvFLELFAlyxUoS6uoPVvvgFNNZlNpgVDTcw24TTjBJzdyBDkYdWjIa-rIMy4cLPW3m_35a8sQ1IoOtyCcFg/s320/Um+pouco+de+verde%252C+um+pouco+de+esperan%25C3%25A7a.jpg"},
 {t:"Rua da Mouraria, Beja",m:"Óleo sobre papel",y:2021,img:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEilsTtNhncAWs6kJ8-ACODnYZL54atXxMzgs4yIRIHqXzgUPySb2EQYh1ni69K_tGN7XM7MOlLeWGUi1T_JYZoKfpfGxGUTwclmnFFNXtG9Gf4G-c61k69MH1wleh4-mpg5DzeE1g/s320/Rua+da+Mouraria%252C+Beja.jpg"}
];

/* ------------------------------------------------------------------ */
function limpar(u){ return u ? u.replace(/hyphenhyphen/g,'-') : u; }
function esc(s){
  return (s||'').replace(/[&<>"]/g,function(c){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];
  });
}
function pad(n){
  n=Number(n);
  if(!isFinite(n)) return '';
  return n<10 ? ('0'+n) : String(n);
}

var PREFIXOS = [
  {re:/^tela\s+a\s+[óo]leo\s*[-–—:]\s*/i,      m:'Óleo sobre tela'},
  {re:/^quadro\s+a\s+[óo]leo\s*[-–—:]\s*/i,    m:'Óleo sobre tela'},
  {re:/^pintura\s+a\s+[óo]leo\s*[-–—:]\s*/i,   m:'Óleo sobre tela'},
  {re:/^[óo]leo\s+sobre\s+tela\s*[-–—:]\s*/i,  m:'Óleo sobre tela'},
  {re:/^[óo]leo\s+sobre\s+papel\s*[-–—:]\s*/i, m:'Óleo sobre papel'},
  {re:/^ilustra[çc][ãõao]?[eo]?s?\s*[-–—:]\s*/i, m:'Ilustração'},
  {re:/^desenho\s*[-–—:]\s*/i,                 m:'Desenho'}
];
function parseTitulo(raw){
  var t=(raw||'').trim(), m='';
  for(var i=0;i<PREFIXOS.length;i++){
    if(PREFIXOS[i].re.test(t)){ m=PREFIXOS[i].m; t=t.replace(PREFIXOS[i].re,'').trim(); break; }
  }
  if(!m){
    if(/papel/i.test(raw)) m='Óleo sobre papel';
    else if(/ilustra/i.test(raw)) m='Ilustração';
    else m='Óleo sobre tela';
  }
  t=t.replace(/^["'“”]|["'“”]$/g,'').trim();
  return { t: t || (raw||'').trim(), m:m };
}

/* ------------------------------------------------------------------ */
var OBRAS=[], VISIVEIS=[], FILTRO='Todos', PAGINA=1, falhas=0, pronto=false;
var VISTAS=[4,2,1], VISTA=4;   /* obras por fila, à escolha de quem visita */

function lerVista(){
  try{
    var v=parseInt(localStorage.getItem('ana-vista'),10);
    if(VISTAS.indexOf(v)>=0) VISTA=v;
  }catch(e){}
}
function guardarVista(){
  try{ localStorage.setItem('ana-vista',String(VISTA)); }catch(e){}
}
function porPaginaEfectiva(){
  var n=larguraColunas();
  if(n>=4) return 12;      /* 3 filas */
  if(n===2) return 8;      /* 4 filas */
  return 6;                /* uma por fila: página curta */
}
function maxColunas(){
  return window.innerWidth<620 ? 1 : (window.innerWidth<1020 ? 2 : 4);
}
var raiz, modo, porPagina, limite;
var elFiltros, elGrelha, elEstado, elAviso, elPaginacao, elContagem, elVista;

window.__anaFeed = function(json){
  try{
    var ents=(json&&json.feed&&json.feed.entry)||[], out=[];
    for(var i=0;i<ents.length;i++){
      var e=ents[i];
      var html=(e.content&&e.content.$t)||(e.summary&&e.summary.$t)||'';
      var ano=((e.published&&e.published.$t)||'').slice(0,4);
      var grandes=[], pequenas=[], mm;
      var rxA=/<a[^>]+href\s*=\s*["']([^"']*blogger\.googleusercontent\.com[^"']*)["']/gi;
      var rxI=/<img[^>]+src\s*=\s*["']([^"']+)["']/gi;
      while((mm=rxA.exec(html))) grandes.push(limpar(mm[1]));
      while((mm=rxI.exec(html))) pequenas.push(limpar(mm[1]));
      if(!pequenas.length && e.media$thumbnail && e.media$thumbnail.url){
        pequenas.push(limpar(e.media$thumbnail.url));
      }
      var total=Math.max(grandes.length,pequenas.length);
      if(!total) continue;
      var p=parseTitulo((e.title&&e.title.$t)||'');
      for(var k=0;k<total;k++){
        out.push({
          t: total>1 ? p.t+' ('+(k+1)+')' : p.t,
          m: p.m,
          y: ano ? parseInt(ano,10) : null,
          img: grandes[k]||pequenas[k],
          mini: pequenas[k]||grandes[k]
        });
      }
    }
    if(out.length) OBRAS=out;
  }catch(err){ /* fica o fallback */ }
  arrancar();
};

function carregar(){
  var s=document.createElement('script');
  s.src='https://'+BLOG+'/feeds/posts/default?alt=json-in-script&max-results=500&callback=__anaFeed';
  s.onerror=arrancar;
  document.body.appendChild(s);
  setTimeout(function(){ if(!pronto) arrancar(); },6000);
}

/* ------------------------------------------------------------------ */
function arrancar(){
  if(pronto) return; pronto=true;
  if(!OBRAS.length) OBRAS=FALLBACK.slice();

  document.querySelectorAll('[data-total-obras]').forEach(function(el){
    el.textContent = OBRAS.length + (el.dataset.totalObras==='curto' ? '' : ' obras');
  });

  if(modo==='destaque'){ desenharDestaque(); return; }
  desenharFiltros();
  PAGINA = paginaDoEndereco();
  desenhar();
}

function paginaDoEndereco(){
  var m=/^#pagina-(\d+)$/.exec(location.hash||'');
  return m ? Math.max(1,parseInt(m[1],10)) : 1;
}

/* --------------------------- destaque (entrada) --------------------------- */
function desenharDestaque(){
  var obras=OBRAS.slice(0,limite).map(function(o,k){
    var c=Object.create(o); c.__i=k; c.__n=k+1; return c;
  });
  VISIVEIS=obras;
  var nCols=larguraColunas();
  elGrelha.setAttribute('data-cols', String(nCols));
  elGrelha.innerHTML = colunas(obras, nCols);
  ligarCartoes();
}

/* --------------------------- filtros --------------------------- */
function desenharFiltros(){
  var cats=['Todos'], visto={};
  OBRAS.forEach(function(o){ if(o.m && !visto[o.m]){ visto[o.m]=1; cats.push(o.m); } });
  elFiltros.innerHTML = cats.map(function(c){
    return '<button type="button" data-c="'+esc(c)+'" aria-pressed="'+(c===FILTRO)+'">'+esc(c)+'</button>';
  }).join('');
  elFiltros.querySelectorAll('button').forEach(function(b){
    b.addEventListener('click',function(){
      FILTRO=b.dataset.c; PAGINA=1;
      elFiltros.querySelectorAll('button').forEach(function(x){
        x.setAttribute('aria-pressed', String(x.dataset.c===FILTRO));
      });
      desenhar(); irParaTopo();
    });
  });
}

/* --------------------------- selector de vista --------------------------- */
/* ícone: tantas colunas quantas as obras por fila */
function iconeVista(n){
  var vb=18, gap=2, largura=(vb-gap*(n-1))/n, r='';
  for(var i=0;i<n;i++){
    r+='<rect x="'+(i*(largura+gap)).toFixed(2)+'" y="0" width="'+largura.toFixed(2)+'" height="14" rx="1"/>';
  }
  return '<svg width="18" height="14" viewBox="0 0 18 14" fill="currentColor" aria-hidden="true">'+r+'</svg>';
}
function desenharVista(){
  if(!elVista) return;
  var maxC=maxColunas();
  elVista.innerHTML='<span class="rot mono">Vista</span>'+
    VISTAS.map(function(n){
      var cabe = n<=maxC;
      var descricao = (n===1?'Uma obra':n+' obras')+' por fila';
      return '<button type="button" data-n="'+n+'"'+
        ' aria-pressed="'+(n===VISTA)+'"'+
        ' title="'+(cabe?descricao:'Não cabe neste ecrã')+'"'+
        (cabe?'':' disabled')+
        ' aria-label="'+descricao+'">'+iconeVista(n)+'</button>';
    }).join('');
  elVista.querySelectorAll('button[data-n]').forEach(function(b){
    b.addEventListener('click',function(){
      if(b.disabled) return;
      var primeira=(PAGINA-1)*porPagina;      /* índice da obra que está no topo */
      VISTA=parseInt(b.dataset.n,10);
      guardarVista();
      PAGINA=Math.floor(primeira/porPaginaEfectiva())+1;
      desenhar();
    });
  });
}

/* --------------------------- grelha + paginação --------------------------- */
function larguraColunas(){
  if(modo==='destaque') return Math.min(3, maxColunas());
  return Math.min(VISTA, maxColunas());   /* a escolha nunca ultrapassa o que cabe */
}
function colunas(lista, n){
  var cols=[]; for(var c=0;c<n;c++) cols.push('');
  lista.forEach(function(o,i){
    cols[i%n] += cartao(o, o.__n);
  });
  return cols.map(function(h){ return '<div class="col">'+h+'</div>'; }).join('');
}
function cartao(o, numero){
  return '<figure class="card" data-i="'+o.__i+'" tabindex="0" role="button" '+
    'aria-label="Ver '+esc(o.t)+' em detalhe">'+
      '<div class="frame skeleton" data-titulo="'+esc(o.t)+'">'+
        '<img loading="lazy" decoding="async" data-try="0" data-mini="'+esc(o.mini||o.img)+'" '+
        'src="'+esc(o.img)+'" alt="'+esc(o.t)+' — '+esc(o.m)+(o.y?', '+o.y:'')+'">'+
      '</div>'+
      '<figcaption>'+
        '<span class="idx" aria-hidden="true">'+pad(numero)+'</span>'+
        '<span><span class="t">'+esc(o.t)+'</span>'+
        '<span class="s mono" style="display:block">'+esc(o.m)+(o.y?' · '+o.y:'')+'</span></span>'+
      '</figcaption>'+
    '</figure>';
}

function desenhar(){
  var filtradas = OBRAS.filter(function(o){ return FILTRO==='Todos' || o.m===FILTRO; });
  porPagina = porPaginaEfectiva();
  var totalPaginas = Math.max(1, Math.ceil(filtradas.length/porPagina));
  if(PAGINA>totalPaginas) PAGINA=totalPaginas;

  var inicio=(PAGINA-1)*porPagina;
  VISIVEIS = filtradas.slice(inicio, inicio+porPagina).map(function(o,k){
    var c=Object.create(o); c.__i=k; c.__n=inicio+k+1; return c;
  });

  falhas=0; verificarFalhas();
  elEstado.style.display = filtradas.length ? 'none' : 'block';
  if(!filtradas.length) elEstado.textContent='Sem obras nesta categoria.';
  if(elContagem){
    elContagem.textContent = filtradas.length + (filtradas.length===1?' obra':' obras');
  }

  var nCols=larguraColunas();
  elGrelha.setAttribute('data-cols', String(nCols));
  elGrelha.innerHTML = colunas(VISIVEIS, nCols);
  ligarCartoes();
  desenharVista();
  desenharPaginacao(totalPaginas, filtradas.length, inicio);
}

function desenharPaginacao(totalPaginas, totalObras, inicio){
  if(!elPaginacao) return;
  if(totalPaginas<=1){ elPaginacao.innerHTML=''; elPaginacao.hidden=true; return; }
  elPaginacao.hidden=false;

  var fim=Math.min(inicio+porPagina, totalObras);
  var h='<span class="info mono">'+(inicio+1)+'–'+fim+' de '+totalObras+'</span>';
  h+='<button type="button" data-p="'+(PAGINA-1)+'"'+(PAGINA===1?' disabled':'')+' aria-label="Página anterior">‹</button>';

  var nums=[];
  for(var i=1;i<=totalPaginas;i++){
    if(i===1 || i===totalPaginas || Math.abs(i-PAGINA)<=1) nums.push(i);
    else if(nums[nums.length-1]!=='…') nums.push('…');
  }
  nums.forEach(function(i){
    if(i==='…'){ h+='<span class="reticencias" aria-hidden="true">…</span>'; return; }
    h+='<button type="button" data-p="'+i+'"'+(i===PAGINA?' aria-current="page"':'')+
       ' aria-label="Página '+i+'">'+i+'</button>';
  });
  h+='<button type="button" data-p="'+(PAGINA+1)+'"'+(PAGINA===totalPaginas?' disabled':'')+' aria-label="Página seguinte">›</button>';

  elPaginacao.innerHTML=h;
  elPaginacao.querySelectorAll('button[data-p]').forEach(function(b){
    b.addEventListener('click',function(){
      if(b.disabled) return;
      PAGINA=parseInt(b.dataset.p,10);
      if(history.replaceState) history.replaceState(null,'','#pagina-'+PAGINA);
      desenhar(); irParaTopo();
    });
  });
}

function irParaTopo(){
  var alvo=document.getElementById('obra')||raiz;
  if(alvo && alvo.scrollIntoView) alvo.scrollIntoView({behavior:'smooth',block:'start'});
}

/* --------------------------- cartões --------------------------- */
function ligarCartoes(){
  var reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function(es){
    es.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
  },{rootMargin:'120px'}) : null;

  elGrelha.querySelectorAll('.card').forEach(function(cd){
    if(reduzir || !io) cd.classList.add('in'); else io.observe(cd);
    cd.addEventListener('click',function(){ abrir(parseInt(cd.dataset.i,10),cd); });
    cd.addEventListener('keydown',function(ev){
      if(ev.key==='Enter'||ev.key===' '){ ev.preventDefault(); abrir(parseInt(cd.dataset.i,10),cd); }
    });
    var im=cd.querySelector('img'), fr=cd.querySelector('.frame');
    im.addEventListener('load',function(){ fr.classList.remove('skeleton'); fr.classList.add('loaded'); });
    im.addEventListener('error',function(){
      var n=parseInt(im.dataset.try||'0',10), mini=im.dataset.mini||'';
      if(n===0 && mini && mini!==im.src){ im.dataset.try='1'; im.src=mini; return; }
      fr.classList.remove('skeleton'); fr.classList.add('falhou');
      falhas++; verificarFalhas();
    });
  });
}
function verificarFalhas(){
  if(!elAviso) return;
  elAviso.hidden = !(VISIVEIS.length>0 && falhas>=VISIVEIS.length);
}

/* --------------------------- lightbox --------------------------- */
var lb, lbImg, lbT, lbS, lbN, idx=0, ultimoFoco=null;

function construirLightbox(){
  lb=document.createElement('div');
  lb.className='lb'; lb.id='lb';
  lb.setAttribute('role','dialog'); lb.setAttribute('aria-modal','true');
  lb.setAttribute('aria-label','Obra em detalhe');
  lb.innerHTML=
    '<span class="mono counter" id="lbN"></span>'+
    '<button class="close" id="lbClose" aria-label="Fechar"><svg width="15" height="15" viewBox="0 0 15 15" aria-hidden="true"><path d="M1 1l13 13M14 1L1 14" stroke="currentColor" stroke-width="1.4"/></svg></button>'+
    '<button class="prev" id="lbPrev" aria-label="Obra anterior"><svg width="10" height="16" viewBox="0 0 10 16" fill="none" aria-hidden="true"><path d="M9 1L2 8l7 7" stroke="currentColor" stroke-width="1.4"/></svg></button>'+
    '<button class="next" id="lbNext" aria-label="Obra seguinte"><svg width="10" height="16" viewBox="0 0 10 16" fill="none" aria-hidden="true"><path d="M1 1l7 7-7 7" stroke="currentColor" stroke-width="1.4"/></svg></button>'+
    '<img id="lbImg" alt="">'+
    '<div class="cap"><div class="t" id="lbT"></div><div class="s mono" id="lbS"></div></div>';
  document.body.appendChild(lb);
  lbImg=lb.querySelector('#lbImg'); lbT=lb.querySelector('#lbT');
  lbS=lb.querySelector('#lbS');     lbN=lb.querySelector('#lbN');

  lb.querySelector('#lbClose').addEventListener('click',fechar);
  lb.querySelector('#lbPrev').addEventListener('click',function(e){ e.stopPropagation(); mover(-1); });
  lb.querySelector('#lbNext').addEventListener('click',function(e){ e.stopPropagation(); mover(1); });
  lb.addEventListener('click',function(e){ if(e.target===lb) fechar(); });

  document.addEventListener('keydown',function(e){
    if(!lb.classList.contains('open')) return;
    if(e.key==='Escape'){ fechar(); return; }
    if(e.key==='ArrowLeft'){ mover(-1); return; }
    if(e.key==='ArrowRight'){ mover(1); return; }
    if(e.key==='Tab'){
      var f=lb.querySelectorAll('button'), primeiro=f[0], ultimo=f[f.length-1];
      if(e.shiftKey && document.activeElement===primeiro){ e.preventDefault(); ultimo.focus(); }
      else if(!e.shiftKey && document.activeElement===ultimo){ e.preventDefault(); primeiro.focus(); }
    }
  });
}
function abrir(i,origem){
  if(!isFinite(i) || !VISIVEIS[i]) return;
  idx=i; ultimoFoco=origem||document.activeElement;
  pintar(); lb.classList.add('open');
  document.body.classList.add('lb-open');
  document.body.style.overflow='hidden';
  lb.querySelector('#lbClose').focus();
}
function pintar(){
  var o=VISIVEIS[idx]; if(!o) return;
  lbImg.src=o.img; lbImg.alt=o.t+' — '+o.m+(o.y?', '+o.y:'');
  lbImg.onerror=function(){ if(o.mini && lbImg.src!==o.mini) lbImg.src=o.mini; };
  lbT.textContent=o.t;
  lbS.textContent=o.m+(o.y?' · '+o.y:'');
  lbN.textContent=pad(idx+1)+' / '+pad(VISIVEIS.length);
  lb.setAttribute('aria-label',o.t);
}
function fechar(){
  lb.classList.remove('open');
  document.body.classList.remove('lb-open');
  lbImg.src=''; document.body.style.overflow='';
  if(ultimoFoco && ultimoFoco.focus) ultimoFoco.focus();
}
function mover(d){ idx=(idx+d+VISIVEIS.length)%VISIVEIS.length; pintar(); }

/* --------------------------- arranque --------------------------- */
function montar(){
  raiz=document.getElementById('galeria');
  if(!raiz) return;
  modo = raiz.dataset.modo || 'galeria';
  porPagina = parseInt(raiz.dataset.porPagina||'12',10);
  limite = parseInt(raiz.dataset.limite||'6',10);

  raiz.innerHTML =
    (modo==='galeria' ?
      '<div class="barra-galeria">'+
        '<div class="filters" id="filtros" role="group" aria-label="Filtrar obras por técnica"></div>'+
        '<div class="vista" id="vista" role="group" aria-label="Obras por fila"></div>'+
      '</div>' : '')+
    '<div class="grid" id="grelha"></div>'+
    '<p class="state" id="estado">A carregar as obras…</p>'+
    '<div class="aviso" id="aviso" hidden><p><strong>As imagens não carregaram.</strong> '+
      'As fotografias das obras estão alojadas no blogue da Ana (Blogger/Google) e são pedidas quando alguém abre a página. '+
      'Se estiveres a ver isto numa pré-visualização fechada ou sem ligação à internet, abre o ficheiro directamente no navegador — '+
      'ou publica o site — e elas aparecem.</p></div>'+
    (modo==='galeria' ? '<nav class="paginacao" id="paginacao" aria-label="Páginas da galeria" hidden></nav>' : '');

  elFiltros=raiz.querySelector('#filtros');
  elVista=raiz.querySelector('#vista');
  elGrelha=raiz.querySelector('#grelha');
  elEstado=raiz.querySelector('#estado');
  elAviso=raiz.querySelector('#aviso');
  elPaginacao=raiz.querySelector('#paginacao');
  elContagem=document.getElementById('contagem');

  lerVista();
  construirLightbox();
  carregar();

  var nc=larguraColunas(), mc=maxColunas(), rt;
  window.addEventListener('resize',function(){
    var n=larguraColunas(), m=maxColunas();
    if(n===nc && m===mc) return;
    nc=n; mc=m;
    clearTimeout(rt); rt=setTimeout(function(){
      if(!OBRAS.length) return;
      if(modo==='destaque') desenharDestaque(); else desenhar();
    },160);
  });
}

/* utilitários de página (ano no rodapé, menu, cabeçalho) */
function chrome(){
  var ano=document.getElementById('ano');
  if(ano) ano.textContent=new Date().getFullYear();

  var hdr=document.getElementById('hdr');
  if(hdr) window.addEventListener('scroll',function(){
    hdr.classList.toggle('stuck', window.scrollY>8);
  },{passive:true});

  var menu=document.getElementById('menu'), burger=document.getElementById('burger');
  if(menu && burger){
    burger.addEventListener('click',function(){
      var aberto=menu.classList.toggle('open');
      burger.setAttribute('aria-expanded',String(aberto));
      burger.setAttribute('aria-label', aberto?'Fechar menu':'Abrir menu');
    });
    menu.addEventListener('click',function(e){
      if(e.target.tagName==='A'){ menu.classList.remove('open'); burger.setAttribute('aria-expanded','false'); }
    });
  }
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',function(){ chrome(); montar(); });
else { chrome(); montar(); }

})();
