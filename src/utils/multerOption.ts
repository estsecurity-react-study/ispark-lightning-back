import { existsSync, mkdirSync } from 'fs';
import { diskStorage, memoryStorage } from 'multer';
// import getProcessEnv from './getProcessEnv';
// import uuidRandom from './uuidRandom';

export const multerOptions = {
  fileFilter: (request, file, callback) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      // 이미지 형식은 jpg, jpeg, png만 허용합니다.
      callback(null, true);
    } else {
      callback('지원하지 않는 이미지 형식입니다.', false);
    }
  },
  //   storage: diskStorage({
  //     destination: (request, file, callback) => {
  //       const uploadPath = 'public';
  //       console.log(file);
  //       if (!existsSync(uploadPath)) {
  //         // public 폴더가 존재하지 않을시, 생성합니다.
  //         mkdirSync(uploadPath);
  //       }

  //       callback(null, uploadPath);
  //     },

  //     filename: (request, file, callback) => {
  //       callback(null, `123-${file.originalname}`);
  //     },
  //   }),
  storage: memoryStorage(),
};
/**
 *  {
    fieldname: 'image',
    originalname: 'favicon-32x32.png',
    encoding: '7bit',
    mimetype: 'image/png',
    destination: 'public',
    filename: '123-favicon-32x32.png',
    path: 'public/123-favicon-32x32.png',
    size: 658
  }
 */
// export const createImageURL = (file): string => {
//   const serverAddress: string = getProcessEnv('SERVER_ADDRESS');

//   // 파일이 저장되는 경로: 서버주소/public 폴더
//   // 위의 조건에 따라 파일의 경로를 생성해줍니다.
//   return `${serverAddress}/public/${file.filename}`;
// };
