let sepeticonadet = document.querySelector(".adet");
const apidiv = document.getElementById("api");
const canvasbody = document.querySelector(".offcanvas-body");
let toplamfiyat = document.getElementById("toplamfiyat");
let resimdizi = JSON.parse(localStorage.getItem("resimler")) || [];
let sepettekiler;

//! APİ'den Veri Çekme
async function getapi() {
  try {
    await fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        domayaz(data);
      });
  } catch (error) {
    apidiv.innerHTML = ` 
    <img id="notfound" src="notfound.png" alt="" >
    `;
  }
}
getapi();

// ! Çekilen Veriyi Doma Yazma

function domayaz(data) {
  const cards = document.createElement("div");

  cards.innerHTML = "";
  cards.classList = "row";
  data.forEach((item) => {
    cards.innerHTML += `
    <div class="card">
    <figure class="imghvr-fold-left" >
    <img src=${item.image} class="card-img-top" alt="...">
    <figcaption>
    <p class="card-text">${item.description}</p>
    </figcaption>
    </figure>
      
      <div class="card-body">
        <h5 class="card-title">${item.title}</h5>
        <div id="cart-alt-bölüm">
        <button href="#" class="btn btn-primary">EKLE</button>
        <span class="dolar"> $ <span class="fiyat" >${item.price}</span>  </span></div>
       
      </div>
    </div>
     
      `;
    apidiv.appendChild(cards);
  });

  const butonlar = document.querySelectorAll(".btn");

  butonlar.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();

      sepeticonadet.textContent++;
      localStorage.setItem(
        "sepeticonadet",
        JSON.stringify(sepeticonadet.textContent)
      );

      let resimfor = e.target.closest(".card").querySelectorAll("img");

      resimfor.forEach((resim) => {
        let imageUrl = resim.getAttribute("src");

        resimdizi.push(imageUrl);
      });

      localStorage.setItem("resimler", JSON.stringify(resimdizi));

      item.disabled = true;

      sepettekiler = document.createElement("div");

      sepettekiler.innerHTML = "";
      sepettekiler.innerHTML += `
    
      <div class="row canvasrow">


      <div class="col-sm-3 col-3">
        <img class="canvasresim" src="${
          e.target.closest(".card").querySelector(".card-img-top").src
        }" alt="" />
      </div> 

      <div class="col-sm-3 col-3 fiyat"> $ ${
        e.target.closest(".card").querySelector(".fiyat").textContent
      }</div>


      <div class="col-sm-3 col-3 kontrol">
        <i class="fas fa-minus"></i>
        <span class="rakam"> 1 </span>
        <i class="fas fa-plus"></i>
      </div>

      <div class="col-sm-3 col-3"><i class="fas fa-trash"></i></div>


    </div>
    `;

      canvasbody.appendChild(sepettekiler);

      let fiyat = parseFloat(
        e.target.closest(".card").querySelector(".fiyat").textContent
      );

      sepetadetkontrol(sepettekiler, item, fiyat, resimdizi);
      sepetfiyathesapla(e, sepettekiler);
      // refresh(sepettekiler, resimdizi);
    });
  });
}

// ! Sepetin İçinde Ürün Artırıp Azaltma
function sepetadetkontrol(sepettekiler, item, resimdizi, fiyat) {
  let canvasrow = sepettekiler.querySelector(".canvasrow");
  let canvasadet = canvasrow.querySelector(".rakam");

  canvasrow.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-plus")) {
      canvasadet.textContent++;
      sepeticonadet.textContent++;
      localStorage.setItem(
        "sepeticonadet",
        JSON.stringify(sepeticonadet.textContent)
      );
    }

    if (e.target.classList.contains("fa-minus")) {
      canvasadet.textContent--;
      sepeticonadet.textContent--;
      localStorage.setItem(
        "sepeticonadet",
        JSON.stringify(sepeticonadet.textContent)
      );
    }

    if (canvasadet.textContent < 1) {
      e.target.closest(".row").remove();
      item.disabled = false;
    }

    if (e.target.classList.contains("fa-trash")) {
      e.target.closest(".row").remove();
      
      item.disabled = false;
      let a=parseInt(e.target.closest(".canvasrow").querySelector(".rakam").textContent)
    
      sepeticonadet.textContent=parseInt(sepeticonadet.textContent)-a;
      canvasadet.textContent = 0;
      console.log(a);
      localStorage.setItem(
        "sepeticonadet",
        JSON.stringify(sepeticonadet.textContent)
      );
    }
    sepetfiyathesapla();
  });
}

// ! Sepetin İçinde Toplam Fiyat Hesaplama
function sepetfiyathesapla() {
  let toplamFiyat = 0;

  const sepettekiUrunler = document.querySelectorAll(".canvasrow");

  sepettekiUrunler.forEach((item) => {
    const miktar = parseFloat(item.querySelector(".rakam").textContent);
    const fiyat = parseFloat(item.querySelector(".fiyat").textContent.slice(2));

    toplamFiyat += miktar * fiyat;
  });

  toplamfiyat.textContent = toplamFiyat.toFixed(2);
  localStorage.setItem("toplamfiyat", JSON.stringify(toplamfiyat.textContent));
  // localStorage.setItem("rakam",JSON.stringify(miktar.textContent))
}

