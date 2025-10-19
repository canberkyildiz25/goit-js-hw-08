// ...existing code...

// Inject CSS from JS (küçük resimler, hover ve responsive ayarlar)
const injectedStyles = `
ul.gallery {
  list-style: none;
  padding: 0;
  margin: 24px auto;
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
  box-sizing: border-box;
}

.gallery-item { margin: 0; }

.gallery-link {
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 8px;
  text-decoration: none;
  background: #f7f7f7;
}

/* Küçük resim boyutu */
.gallery-image {
  display: block;
  width: 360px;
  height: 200px;
  object-fit: cover;
  transition: transform 0.28s ease, filter 0.28s ease;
  will-change: transform;
  transform-origin: center center;
  border: 0;
}

/* Hover/focus: 376x208 etkisini scale ile veriyoruz (376/360 ≈ 1.044) */
.gallery-link:hover .gallery-image,
.gallery-link:focus .gallery-image {
  transform: scale(1.044);
  filter: saturate(1.05);
}

/* Mobil: resimleri konteynıra uyacak şekilde küçült */
@media (max-width: 480px) {
  ul.gallery {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 10px;
    margin: 12px;
  }
  .gallery-image {
    width: 100%;
    height: auto;
    transform: none;
  }
}
`;
const styleTag = document.createElement("style");
styleTag.textContent = injectedStyles;
document.head.appendChild(styleTag);

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

// Delegasyon: ul.gallery üzerinde tıklamaları dinle
gallery.addEventListener("click", (event) => {
  const link = event.target.closest("a.gallery-link");
  if (!link) return;
  event.preventDefault();

  // Original resim URL'sini al
  const originalUrl = link.href;

  // BasicLightbox ile modal oluştur (hedef boyut 1112x640, responsive fallback ile)
  const instance = basicLightbox.create(
    `
    <img src="${originalUrl}" width="1112" height="640" style="display:block;max-width:100%;width:1112px;height:auto;">
  `,
    {
      onShow: (instance) => {
        document.addEventListener("keydown", onEscKeyPress);
      },
      onClose: (instance) => {
        document.removeEventListener("keydown", onEscKeyPress);
      },
    }
  );

  function onEscKeyPress(event) {
    if (event.code === "Escape") {
      instance.close();
    }
  }

  instance.show();
});
