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
}