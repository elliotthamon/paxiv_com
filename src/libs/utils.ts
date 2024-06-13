import hmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';

export const generatePassword = () => {
  const length = Math.floor(Math.random() * (32 - 8 + 1) + 8); // generate a random length between 8 and 32
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const specialChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  let password = "";
  let hasUppercase = false;
  let hasLowercase = false;
  let hasNumber = false;
  let hasSpecialChar = false;

  while (password.length < length) {
    const charType = Math.floor(Math.random() * 4); // generate a random number between 0 and 3 to determine the character type
    let char;

    switch (charType) {
      case 0:
        char = uppercase[Math.floor(Math.random() * uppercase.length)];
        hasUppercase = true;
        break;
      case 1:
        char = lowercase[Math.floor(Math.random() * lowercase.length)];
        hasLowercase = true;
        break;
      case 2:
        char = numbers[Math.floor(Math.random() * numbers.length)];
        hasNumber = true;
        break;
      case 3:
        char = specialChars[Math.floor(Math.random() * specialChars.length)];
        hasSpecialChar = true;
        break;
    }

    password += char;
  }

  // ensure that the password has at least one character of each type
  if (!hasUppercase) {
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
  }
  if (!hasLowercase) {
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
  }
  if (!hasNumber) {
    password += numbers[Math.floor(Math.random() * numbers.length)];
  }
  if (!hasSpecialChar) {
    password += specialChars[Math.floor(Math.random() * specialChars.length)];
  }

  return password;
};

export const generateHash = (email: string) => {
  return Base64.stringify(hmacSHA256(JSON.stringify({ body: email }), "paxiv_secret"));
};

export const getImageURL = (imageKey: string) => {
  if (imageKey === undefined || imageKey === "") {
    return "/images/assets.png";
  } else {
    const bucketName = process.env.NEXT_PUBLIC_UPLOAD_BUCKET_NAME;
    const region = process.env.NEXT_PUBLIC_REGION;
    imageKey = imageKey.replace(/http\..*s3\.us-east-.*\.amazonaws\.com/, "");
    const imageUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${imageKey}`;
    return imageUrl;
  }
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const options = {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  //@ts-ignore
  const formattedDate = date.toLocaleString("en-US", options);
  return formattedDate.replace(" at", "");
};

export const parseMessageBody = (message: string): string => {
  const converted_message = message.replace(/\n/g, "<br/>");
  return converted_message;
};

export const getCurrentYear = () => {
  const currentYear = new Date().getFullYear();
  return currentYear;
};

export const getNotification = (
  eventType: string,
  user: string,
  company: string,
  asset: string
): string => {
  if (eventType == "ViewAsset") {
    return `${user} at ${company} recently viewed ${asset}.`;
  } else if (eventType == "ClickedWebsite") {
    return `${user} at ${company} has visited your company website.`;
  } else if (eventType == "ClickedEmail") {
    return `${user} at ${company} has clicked on your email.`;
  } else {
    return "";
  }
};

export const sortNotifications = (data: Array<any>) => {
  data.sort((a, b) => {
    if (a.status === "Unread" && b.status !== "Unread") {
      return -1;
    } else if (a.status !== "Unread" && b.status === "Unread") {
      return 1;
    }

    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
  return data;
};

export const setScrollHidden = () => {
  if (document.body.style.overflow !== "hidden") {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflowY = "scroll";
  }
};

export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error: any) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

export const getCroppedImg = async (imageSrc: any, crop: any) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  canvas.width = safeArea;
  canvas.height = safeArea;

  ctx?.translate(safeArea / 2, safeArea / 2);
  ctx?.translate(-safeArea / 2, -safeArea / 2);

  ctx?.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5
  );

  const data = ctx?.getImageData(0, 0, safeArea, safeArea);

  canvas.width = crop.width;
  canvas.height = crop.height;

  if (data != undefined) {
    ctx?.putImageData(
      data,
      0 - safeArea / 2 + image.width * 0.5 - crop.x,
      0 - safeArea / 2 + image.height * 0.5 - crop.y
    );
  }

  return canvas;
};

export const getArchived = (notifications: Array<any>) => {
  let archived_notifications = [];
  if (notifications.length > 0) {
    for (let notification of notifications) {
      if (notification.status == "Archived") {
        archived_notifications.push(notification);
      }
    }
  }
  return archived_notifications;
};

export const getNotArchived = (notifications: Array<any>) => {
  let archived_notifications = [];
  if (notifications.length > 0) {
    for (let notification of notifications) {
      if (notification.status !== "Archived") {
        archived_notifications.push(notification);
      }
    }
  }
  return archived_notifications;
};

export const scrollToSection = (ref: any) => {
  if (!!ref.current) {
    // @ts-ignore
    ref.current.scrollIntoView({ behavior: "smooth" });
  }
};

export const priceFormat = (price: number) => {
  if (price == null) return;
  return price.toLocaleString();
};
