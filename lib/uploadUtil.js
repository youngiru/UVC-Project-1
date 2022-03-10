const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const multer = require('multer');

// 메인 업로드 디렉토리 설정
const uploadDir = 'upload';

// post 이미지 업로드 디렉토리 생성
const postDir = 'post';
const postImageDir = path.join(__dirname, '../', uploadDir, postDir); // 이미지가 업로드 될 디렉토리: /upload/post
// 디렉토리가 존재하지 않으면 생성 함(부모까지)
if (!fs.existsSync(postImageDir)) fs.mkdirSync(postImageDir, { recursive: true });

function checkType(file, done, filetypes) {
  const ext = path.extname(file.originalname).toLowerCase();
  // Check ext
  const extname = filetypes.test(ext);
  // Check mime
  // const mimetype = filetypes.test(file.mimetype); // xls가 걸러짐??

  if (extname) {
    return done(null, true);
  }
  return done(null, false);
}

// 게시글(Post) 전용 이미지 업로드 함수
const postImage = (paramName) => {
  const fileDirWeb = `${uploadDir}/${postDir}`; // Post이미지가 올라갈 디렉토리: /upload/post
  const fileTypeCheck = /jpeg|jpg|png|gif|bmp/; // 업로드가 허용되는 파일 타입(이미지만 허용함) - 정규표현식
  const fileSize = 5 * 1024 * 1024; // 업로드 허용 파일 사이즈(MB단위)

  // multer 호출
  const upload = multer({
    storage: multer.diskStorage({
      destination(req, file, done) {
        done(null, fileDirWeb);
      },
      filename(req, file, done) {
        const ext = path.extname(file.originalname).toLowerCase(); // 확장자 추출
        const uuid = uuidv4(); // (파일명을 위한)랜덤 생성
        const fileName = uuid + ext; // 파일명을 변경 한다.
        done(null, fileName);
      },
    }),
    limits: { fileSize },
    fileFilter: (req, file, done) => {
      checkType(file, done, fileTypeCheck);
    },
  });

  return upload.single(paramName);
};

module.exports = {
  postImage,
};
