function sepetadetkontrol(sepettekiler, item, resimdizi, fiyat) {
    let canvasrow = sepettekiler.querySelector(".canvasrow");
    let canvasadet = canvasrow.querySelector(".rakam");
  
    canvasrow.addEventListener("click", (e) => {
      if (e.target.classList.contains("fa-plus")) {
        canvasadet.textContent++;
        sepeticonadet.textContent++;
        localStorage.setItem("sepeticonadet", JSON.stringify(sepeticonadet.textContent));
      }
  
      if (e.target.classList.contains("fa-minus")) {
        canvasadet.textContent--;
        sepeticonadet.textContent--;
        localStorage.setItem("sepeticonadet", JSON.stringify(sepeticonadet.textContent));
        if (canvasadet.textContent < 1) {
          // Ürün adedi sıfıra indiğinde resmi ve ilgili ürünü resimdizi'den kaldır
          const srcToRemove = e.target.closest(".canvasrow").querySelector(".canvasresim").src;
          const indexToRemove = resimdizi.indexOf(srcToRemove);
          if (indexToRemove > -1) {
            resimdizi.splice(indexToRemove, 1);
            localStorage.setItem("resimler", JSON.stringify(resimdizi));
          }
          e.target.closest(".row").remove();
          item.disabled = false;
          return;
        }
      }
  
      if (e.target.classList.contains("fa-trash")) {
        // Sepet ürünü tamamen kaldırdığında resmi ve ilgili ürünü resimdizi'den kaldır
        const srcToRemove = e.target.closest(".canvasrow").querySelector(".canvasresim").src;
        const indexToRemove = resimdizi.indexOf(srcToRemove);
        if (indexToRemove > -1) {
          resimdizi.splice(indexToRemove, 1);
          localStorage.setItem("resimler", JSON.stringify(resimdizi));
        }
        e.target.closest(".row").remove();
        canvasadet.textContent = 0;
        item.disabled = false;
        sepeticonadet.textContent--;
        localStorage.setItem("sepeticonadet", JSON.stringify(sepeticonadet.textContent));
      }
      sepetfiyathesapla();
    });
  }
  