import Config from 'react-native-config';

export default class CategoryData {
    static getFoodHomeData() {
        //http://14.63.172.164:80
        return fetch(`${Config.API_URL}/mobile/users/getFoodsHome.do`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                deviceTp: "Android",
                versionInfo: "Android_1.1.1",
                compId: "DD1",
            })
        }).then((result) => {
            const { status } = result;
            if (status === 200) {
                return result.json();
            }

            return undefined;
        })
    }

    static getMainBestVender({ compId }) {
        return fetch(`${Config.API_URL}/mobile/users/getMainBestVendorList.do`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                deviceTp: "Android",
                versionInfo: "Android_1.1.1",
                compId: compId,
            })
        }).then((result) => {
            const { status } = result;
            if (status === 200) {
                return result.json();
            }

            return undefined;
        })
    }

    static getVenderDetail({ compId, venId }) {
        return fetch(`${Config.API_URL}/mobile/users/getVendor.do`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                deviceTp: "Android",
                versionInfo: "Android_1.1.1",
                compId,
                venId,
            })
        }).then((result) => {
            const { status } = result;
            if (status === 200) {
                return result.json();
            }

            return undefined;
        })
    }

    static getCategoryVendors({ pageNum }) {
        const url = `${Config.API_URL}/mobile/users/selectVendorListV2.do`;
        console.log("getCategoryVendors() url = " + url);
        return fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                deviceTp: "Android",
                versionInfo: "Android_1.1.1",
                lon: "127.0202686",
                lat: "37.5160997",
                grpId: "GG02",
                pageNum,
                pageCount: 100,
                orderBy: "RT",
                compId: "DD1"
            })
        }).then((result) => {
            const { status } = result;
            if (status === 200) {
                return result.json();
            }

            return undefined;
        })
    }

    static getDaumCoor2Address({ lon, lat }) {
        return fetch(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}&input_coord=WGS84`, {
            method: "GET",
            headers: {
                Authorization : "KakaoAK d79e0c1754cd3b420bfb18d109d04e61"
            }
        }).then((result) => {
            const { status } = result;
            if (status === 200) {
                return result.json();
            }

            return undefined;
        })
    }

    static getDaumAddress({ search }) {
        return fetch(`https://dapi.kakao.com/v2/local/search/address.json?query="${search}"`, {
            method: "GET",
            headers: {
                Authorization : "KakaoAK d79e0c1754cd3b420bfb18d109d04e61"
            }
        }).then((result) => {
            const { status } = result;
            if (status === 200) {
                return result.json();
            }

            return undefined;
        })
    }

    static getVersion() {
        return fetch(`${Config.API_URL}/mobile/users/getTerms.do`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                deviceTp: "Android",
                versionInfo: "Android_1.1.1",
                compId: "DD1",
            })
        }).then((result) => {
            const { status } = result;
            if (status === 200) {
                return result.json();
            }

            return undefined;
        })
    }
}