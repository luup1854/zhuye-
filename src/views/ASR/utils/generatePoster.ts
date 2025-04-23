interface PosterOptions {
  images: string[]; // 图片的 URL 列表
  texts: string[]; // 文字列表
  positions: {
    // 每张图片和文字的位置
    image: {
      x: number;
      y: number;
      width: number;
      height: number;
      shape?: "circle" | "rounded";
    }[]; // 形状类型（圆形 或 圆角矩形）
    text: {
      x: number;
      y: number;
      font: string;
      color: string;
      maxWidth?: number; // 文字最大宽度
    }[];
  };
  canvasWidth: number; // Canvas 宽度
  canvasHeight: number; // Canvas 高度
  borderRadius?: number; // 圆角半径，适用于圆角矩形
  outputFormat?: "image/png" | "image/jpeg" | "image/webp"; // 输出格式
  jpegQuality?: number; // JPEG 的质量，范围 0 到 1
  webpQuality?: number; // WebP 的质量，范围 0 到 1
}
/**
 * 生成海报图像的函数，支持多个图像、文字以及不同的图像形状（如圆形或圆角矩形）。
 * 函数会返回一个 Base64 编码的图像。
 *
 * @param {PosterOptions} options 配置对象，包含生成海报所需的所有信息。
 * @param {string[]} options.images 图像 URL 列表，用于绘制海报。
 * @param {string[]} options.texts 文字列表，包含海报上需要显示的文字。
 * @param {Object} options.positions 位置配置。
 * @param {Object[]} options.positions.image 每张图片的位置信息，包含 `x`、`y` 坐标和图片的宽高，及其形状（圆形或圆角矩形）。
 * @param {Object[]} options.positions.text 每段文字的位置信息，包含 `x`、`y` 坐标、字体大小和颜色。
 * @param {number} options.canvasWidth 画布宽度。
 * @param {number} options.canvasHeight 画布高度。
 * @param {number} [options.borderRadius] 圆角矩形的圆角半径，仅在 `shape` 为 `rounded` 时使用。
 * @param {'image/png' | 'image/jpeg' | 'image/webp'} [options.outputFormat='image/png'] 输出格式，支持 PNG、JPEG 或 WebP 格式。
 * @param {number} [options.jpegQuality=0.8] JPEG 图像质量，范围 0 到 1，默认值为 0.8。
 * @param {number} [options.webpQuality=0.8] WebP 图像质量，范围 0 到 1，默认值为 0.8。
 * @returns {Promise<string>} 返回一个 Promise，解析为一个 Base64 编码的图像字符串。
 *
 * @throws {Error} 如果图像加载失败，返回错误信息。
 *
 * @example
 * const options = {
 *   images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
 *   texts: ['Hello World', 'Welcome to my Poster'],
 *   positions: {
 *     image: [
 *       { x: 50, y: 50, width: 100, height: 100, shape: 'circle' },
 *       { x: 200, y: 50, width: 100, height: 100, shape: 'rounded' },
 *       { x: 50, y: 200, width: 100, height: 100 }
 *     ],
 *     text: [
 *       { x: 50, y: 200, font: '30px Arial', color: 'black' },
 *       { x: 50, y: 300, font: '20px Arial', color: 'blue' }
 *     ]
 *   },
 *   canvasWidth: 600,
 *   canvasHeight: 400,
 *   borderRadius: 20,
 *   outputFormat: 'image/webp',
 *   webpQuality: 0.8
 * };
 *
 * generatePoster(options).then(base64Image => {
 *   console.log('生成的 base64 图片:', base64Image);
 *   const img = new Image();
 *   img.src = base64Image;
 *   document.body.appendChild(img);
 * }).catch(error => {
 *   console.error('生成海报错误:', error);
 * });
 */
const generatePoster = (options: PosterOptions): Promise<string> => {
  return new Promise((resolve, reject) => {
    // 动态创建 Canvas 元素
    const canvas = document.createElement("canvas");
    canvas.width = options.canvasWidth;
    canvas.height = options.canvasHeight;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      reject("获取 canvas 上下文失败");
      return;
    }

    // 加载所有图片
    const imagePromises = options.images.map(
      url =>
        new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.src = url;
          img.onload = () => resolve(img);
          img.onerror = reject;
        })
    );

    // 等待所有图片加载完成后开始绘制
    Promise.all(imagePromises)
      .then(images => {
        // 清空 Canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 绘制图片
        images.forEach((img, index) => {
          const { x, y, width, height, shape } = options.positions.image[index];

          // 根据 shape 属性来决定绘制的形状
          if (shape === "circle") {
            // 绘制圆形裁剪区域
            const radius = Math.min(width, height) / 2;
            ctx.save();
            ctx.beginPath();
            ctx.arc(x + width / 2, y + height / 2, radius, 0, Math.PI * 2);
            ctx.clip();
            ctx.drawImage(img, x, y, width, height);
            ctx.restore();
          } else if (shape === "rounded" && options.borderRadius) {
            // 绘制圆角矩形
            const radius = options.borderRadius;
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + width - radius, y);
            ctx.arcTo(x + width, y, x + width, y + height, radius);
            ctx.lineTo(x + width, y + height - radius);
            ctx.arcTo(
              x + width,
              y + height,
              x + width - radius,
              y + height,
              radius
            );
            ctx.lineTo(x + radius, y + height);
            ctx.arcTo(x, y + height, x, y + height - radius, radius);
            ctx.lineTo(x, y + radius);
            ctx.arcTo(x, y, x + radius, y, radius);
            ctx.clip();
            ctx.drawImage(img, x, y, width, height);
            ctx.restore();
          } else {
            // 默认：普通矩形
            ctx.drawImage(img, x, y, width, height);
          }
        });

        // 绘制文字
        options.texts.forEach((text, index) => {
          const { x, y, font, color, maxWidth } = options.positions.text[index];
          if (maxWidth) {
            drawTextWithWordWrap(ctx, text, x, y, font, color, maxWidth);
            return;
          } else {
            ctx.font = font;
            ctx.fillStyle = color;
            ctx.fillText(text, x, y);
          }
        });

        // 返回 Canvas 的 Base64 图片数据，支持不同格式
        let base64Image: string;
        if (options.outputFormat === "image/jpeg") {
          base64Image = canvas.toDataURL(
            "image/jpeg",
            options.jpegQuality || 0.8
          ); // 默认质量为 0.8
        } else if (options.outputFormat === "image/webp") {
          base64Image = canvas.toDataURL(
            "image/webp",
            options.webpQuality || 0.8
          ); // 默认质量为 0.8
        } else {
          base64Image = canvas.toDataURL("image/png");
        }

        resolve(base64Image);
      })
      .catch(error => {
        reject("图片加载失败: " + error);
      });
  });
};

/**
 * 在 canvas 上绘制带换行功能的文字
 *
 * @param {CanvasRenderingContext2D} ctx - canvas 的 2D 渲染上下文
 * @param {string} text - 要绘制的文字
 * @param {number} x - 文字起始位置的 x 坐标
 * @param {number} y - 文字起始位置的 y 坐标
 * @param {string} font - 字体样式（如 "20px Arial"）
 * @param {string} color - 文字颜色
 * @param {number} maxWidth - 每行的最大宽度（超过此宽度会换行）
 */
const drawTextWithWordWrap = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  font: string,
  color: string,
  maxWidth: number
) => {
  ctx.font = font; // 设置字体样式
  ctx.fillStyle = color; // 设置文字颜色

  // 将文本分成多行
  const words = text.split(""); // 按空格分割文字
  let line = ""; // 当前行的文字

  let lineHeight = 38;
  // 计算行高
  if (getFontSize(font)) {
    lineHeight = parseInt(getFontSize(font)) * 1.4;
  }

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + "";
    const testWidth = ctx.measureText(testLine).width;

    // 如果当前行超过最大宽度，换行
    if (testWidth > maxWidth && i > 0) {
      ctx.fillText(line, x, y); // 绘制当前行
      line = words[i] + ""; // 新一行的文字
      y += lineHeight; // 增加行间距
    } else {
      line = testLine; // 继续将单词添加到当前行
    }
  }

  // 绘制最后一行文字
  ctx.fillText(line, x, y);
};

const getFontSize = (str: string): string => {
  const regex = /\d+px/;

  const match = regex.exec(str);
  return match ? match[0] : "";
};

export default generatePoster;
