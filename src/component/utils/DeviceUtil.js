import { Dimensions, PixelRatio } from 'react-native';


export default class DeviceUtil {

    //화면 비율 기준축 100%에 비례 하는 cross 축 길이 계산
    static ratioSize(size, screenWidth) {
        const windowWidth = Dimensions.get('window').width;

        if ((typeof size !== 'number') ||
            (typeof screenWidth !== 'number')) {
            return 0;
        }

        return size * (windowWidth / screenWidth);
    }

    //dp to pixel 변환
    static convertDpToPixel({ width: w, height: h }) {
        const width = PixelRatio.getPixelSizeForLayoutSize(w);
        const height = PixelRatio.getPixelSizeForLayoutSize(h);

        return { width, height };
    }
}