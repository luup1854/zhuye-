import QRCode, { type QRCodeRenderersOptions } from "qrcode";

type qrcodeOptions = {
  text: string;
  width?: number;
  qrcodeOptions?: QRCodeRenderersOptions;
};

const generateQrcode = async (options: qrcodeOptions) => {
  const { toDataURL } = QRCode;
  const url = await toDataURL(options.text, {
    errorCorrectionLevel: "H",
    width: options.width || 200,
    margin: 2,
    ...options.qrcodeOptions
  });
  return url;
};

export default generateQrcode;
