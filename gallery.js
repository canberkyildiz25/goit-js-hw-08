const images = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];
// ...existing code...

// create markup from images array and insert into ul.gallery
const gallery = document.querySelector(".gallery");
if (!gallery) throw new Error("Ul.gallery bulunamadı.");

const markup = images
  .map(
    ({ preview, original, description }) => `
<li class="gallery-item">
  <a class="gallery-link" href="${original}">
    <img
      class="gallery-image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
      loading="lazy"
    />
  </a>
</li>`
  )
  .join("");

gallery.innerHTML = markup;

document.addEventListener("DOMContentLoaded", () => {
  const galleryEl = document.querySelector(".gallery");
  if (!galleryEl) return;

  galleryEl.addEventListener("click", (event) => {
    const link = event.target.closest("a.gallery-link");
    if (!link) return;
    event.preventDefault();

    const originalUrl = link.href;

    // İçeriği sabit boyutlu tutmak için img'e direkt width/height uyguluyoruz.
    const content = `
      <div style="width:1112px;height:640px;display:flex;align-items:center;justify-content:center;">
        <img src="${originalUrl}" width="1112" height="640" style="display:block;width:1112px;height:640px;object-fit:cover;">
      </div>
    `;

    const instance = basicLightbox.create(content, {
      onShow: (inst) => {
        // ESC ile kapatma
        document.addEventListener("keydown", onEsc);
        // Overlay/arka plana tıklamada tek seferde kapat
        const root = inst.element();
        root.addEventListener("click", onOverlayClick);
      },
      onClose: (inst) => {
        document.removeEventListener("keydown", onEsc);
        const root = inst.element();
        root.removeEventListener("click", onOverlayClick);
      },
    });

    function onEsc(e) {
      if (e.code === "Escape") instance.close();
    }

    function onOverlayClick(e) {
      // Eğer tıklanan hedef bir <img> ise hiç kapatma
      if (e.target && e.target.closest && e.target.closest("img")) return;
      // Aksi halde kapan
      instance.close();
    }

    instance.show();
  });
});
