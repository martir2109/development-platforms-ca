import { stylePopUpContainer } from "../utils";

//Template used for footer: https://tailwindflex.com/@mr-robot/basic-footer

const footerHTML = `

<div class="bg-white inset-shadow-2xs break-all">
    <div class="max-w-5xl px-4 sm:px-6 text-gray-800 sm:grid md:grid-cols-4 sm:grid-cols-2 mx-auto">
        <div class="p-5">
            <h3 class="font-bold text-xl text-indigo-600">News Read</h3>
        </div>
        <div class="p-5">
            <div class="text-sm uppercase text-indigo-600 font-bold">Resources</div>
            <a class="my-3 block" href="/#">Documentation <span class="text-teal-600 text-xs p-1"></span></a><a
                class="my-3 block" href="/#">Tutorials <span class="text-teal-600 text-xs p-1"></span></a><a
                class="my-3 block" href="/#">Support</a>
        </div>
        <div class="p-5">
            <div class="text-sm uppercase text-indigo-600 font-bold">Support</div>
            <a class="my-3 block" href="/#">Help Center </a><a
                class="my-3 block" href="/#">Privacy Policy </a><a
                class="my-3 block" href="/#">Conditions </a>
        </div>
        <div class="p-5">
            <div class="text-sm uppercase text-indigo-600 font-bold">Contact us</div>
            <a class="my-3 block" href="/#">Oslo, Norway
                </a><a class="my-3 block" href="/#">newsread@company.com
                </a>
        </div>
    </div>
</div>

<div class="bg-white pt-2">
    <div class="flex pb-5 px-3 m-auto pt-5 border-t text-gray-800 text-sm flex-col
      max-w-5xl items-center">
        
        <div class="my-5">© Copyright 2026. All Rights Reserved.</div>
    </div>
</div>

<!-- Credit: Componentity.com -->
`;

export function renderFooter() {
  const footerContainer = document.getElementById("footer-container");

  const popupContainer = document.getElementById("popup-container");
  stylePopUpContainer(popupContainer);

  if (!footerContainer) {
    displayMessage(popupContainer, "error", "Footer container not found");
    setTimeout(() => {
      popupContainer.innerHTML = "";
    }, 2000);
    return;
  }
  footerContainer.innerHTML = footerHTML;
}
