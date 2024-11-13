(function () {
  function checkEURegion(callback) {
    fetch("https://ipapi.co/json/")
      .then((response) => response.json())
      .then((data) => {
        const europeanCountries = [
          "AT",
          "BE",
          "BG",
          "HR",
          "CY",
          "CZ",
          "DK",
          "EE",
          "FI",
          "FR",
          "DE",
          "GR",
          "HU",
          "IE",
          "IT",
          "LV",
          "LT",
          "LU",
          "MT",
          "NL",
          "PL",
          "PT",
          "RO",
          "SK",
          "SI",
          "ES",
          "SE",
        ];
        if (europeanCountries.includes(data.country_code)) {
          callback(true);
        } else {
          callback(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching geolocation data:", err);
        callback(false);
      });
  }

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  }

  function showCookieBanner(isEU) {
    const banner = document.createElement("div");
    banner.id = "cookie-consent-banner";
    banner.style.position = "fixed";
    banner.style.bottom = "0";
    banner.style.left = "0";
    banner.style.width = "100%";
    banner.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
    banner.style.color = "var(--main-color)";
    banner.style.textAlign = "center";
    banner.style.padding = "15px";
    banner.style.fontSize = "14px";
    banner.style.zIndex = "10000";
    banner.style.display = "flex";
    banner.style.flexDirection = "row";
    banner.style.alignItems = "center";
    banner.style.justifyContent = "center";

    const message = document.createElement("p");
    message.textContent = "This site uses cookies for analytics";
    message.style.color = 'white';
    message.style.marginTop = '20px';

    banner.appendChild(message);

    const buttonContainer = document.createElement("div");
    buttonContainer.style.display = "flex";
    buttonContainer.style.gap = "10px";
    buttonContainer.style.marginLeft = "20px";

    const acceptButton = document.createElement("button");
    acceptButton.textContent = "Accept";
    acceptButton.style.padding = "5px 15px";
    acceptButton.style.border = "none";
    acceptButton.style.borderRadius = "3px";
    acceptButton.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
    acceptButton.style.color = "var(--body-color)";
    acceptButton.style.cursor = "pointer";
    acceptButton.style.fontSize = "14px";

    acceptButton.addEventListener("mouseenter", function () {
      acceptButton.style.backgroundColor = "rgba(255, 255, 255, 1)";
    });
    acceptButton.addEventListener("mouseleave", function () {
      acceptButton.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
    });
    acceptButton.addEventListener("focus", function () {
      acceptButton.style.backgroundColor = "rgba(255, 255, 255, 1)";
    });
    acceptButton.addEventListener("blur", function () {
      acceptButton.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
    });

    acceptButton.addEventListener("click", function () {
      const cookieName = isEU ? "cookieConsent" : "agreement";
      document.cookie = `${cookieName}=accepted; path=/; max-age=${
        86400 * 3650
      }`;
      banner.style.display = "none";
      enableAnalytics();
    });

    const declineButton = document.createElement("button");
    declineButton.textContent = "Decline";
    declineButton.style.padding = "5px 15px";
    declineButton.style.border = "none";
    declineButton.style.borderRadius = "3px";
    declineButton.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
    declineButton.style.color = "var(--body-color)";
    declineButton.style.cursor = "pointer";
    declineButton.style.fontSize = "14px";

    declineButton.addEventListener("mouseenter", function () {
      declineButton.style.backgroundColor = "rgba(255, 255, 255, 1)";
    });
    declineButton.addEventListener("mouseleave", function () {
      declineButton.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
    });
    declineButton.addEventListener("focus", function () {
      declineButton.style.backgroundColor = "rgba(255, 255, 255, 1)";
    });
    declineButton.addEventListener("blur", function () {
      declineButton.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
    });

    declineButton.addEventListener("click", function () {
      const cookieName = isEU ? "cookieConsent" : "agreement";
      document.cookie = `${cookieName}=declined; path=/; max-age=${
        86400 * 3650
      }`;
      banner.style.display = "none";
    });

    buttonContainer.appendChild(acceptButton);
    buttonContainer.appendChild(declineButton);

    banner.appendChild(buttonContainer);
    document.body.appendChild(banner);
  }

  function enableAnalytics() {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-7TP0H4ZL6G";
    document.head.appendChild(script);

    script.onload = function () {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", "G-7TP0H4ZL6G");
    };
  }

  function disableTracking() {
    window["ga-disable-G-7TP0H4ZL6G"] = true;
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (!getCookie("cookieConsent") && !getCookie("agreement")) {
      checkEURegion(function (isEUUser) {
        showCookieBanner(isEUUser);
      });
    } else {
      const consent = getCookie("cookieConsent") || getCookie("agreement");
      if (consent === "accepted") {
        enableAnalytics();
      } else {
        disableTracking();
      }
    }
  });
})();
