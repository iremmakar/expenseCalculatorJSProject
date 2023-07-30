const harcamaInput = document.querySelector("#harcama");
const fiyatInput = document.querySelector("#fiyat");
const formBtn = document.querySelector(".ekle-btn");
const liste = document.querySelector(".liste");
const toplamBilgi = document.querySelector("#toplam-bilgi");
const statusCheck = document.querySelector("#status-input");
const selectFilter = document.querySelector("#filter-select");

formBtn.addEventListener("click", addExpense);

liste.addEventListener("click", handleClick);

selectFilter.addEventListener("change", handleFilter);

let toplam = 0;

function updateToplam(fiyat) {
  toplam += parseInt(fiyat);
  toplamBilgi.innerText = toplam;
}

function addExpense(e) {
  e.preventDefault();

  if (!fiyatInput.value || !harcamaInput.value) return;

  const harcamaDiv = document.createElement("div");
  harcamaDiv.classList.add("harcama");

  if (statusCheck.checked) {
    harcamaDiv.classList.add("payed");
  }

  harcamaDiv.innerHTML = `
    <h2>${harcamaInput.value}</h2>
    <h2 id="value">${fiyatInput.value}</h2>
    <div class="buttons">
      <img src="images/payment.png" alt="" id="payment"/>
      <img src="images/delete.png" alt="" id="remove"/>
    </div>
    
    `;

  liste.appendChild(harcamaDiv);

  updateToplam(fiyatInput.value);

  harcamaInput.value = "";
  fiyatInput.value = "";
}

function handleClick(e) {
  const element = e.target;
  if (element.id === "remove") {
    const wrapperElement = element.parentElement.parentElement;
    const deletedPriceElement = wrapperElement.querySelector("#value");
    const deletedPrice = Number(deletedPriceElement.innerText);
    updateToplam(-deletedPrice);
    wrapperElement.remove();
  }
}

function handleFilter(e) {
  const items = liste.childNodes;
  items.forEach((item) => {
    switch (e.target.value) {
      case "all":
        item.style.display = "flex";
        break;

      case "payed":
        if (!item.classList.contains("payed")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        break;

      case "not-payed":
        if (item.classList.contains("payed")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        break;
    }
  });
}
