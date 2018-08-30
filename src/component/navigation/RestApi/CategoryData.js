export default class CategoryData {
    static getFoodHomeData() {
        //http://14.63.172.164:80
        return fetch('http://14.63.172.164:80/mobile/users/getFoodsHome.do', {
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
        return fetch('http://14.63.172.164:80/mobile/users/getMainBestVendorList.do', {
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
        return fetch('http://14.63.172.164:80/mobile/users/getVendor.do', {
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
        return fetch('http://14.63.172.164:80/mobile/users/selectVendorListV2.do', {
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
}