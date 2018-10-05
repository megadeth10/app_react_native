import Config from 'react-native-config';
import { AsyncStorage } from 'react-native';

const LOCAL_URL = "LOCAL_URL";
const SAVE_INDEX_URL = "SAVE_INDEX_URL";
const MANUAL_URL = "직접입력";
//서버 목록 생성
async function GetServerList() {
    const items = [];

    if (__DEV__) {
        items.push({
            title: "테스트",
            url: Config.API_TEST_URL,
        });
    }

    items.push({
        title: "리얼",
        url: Config.API_REAL_URL,
    });

    if (__DEV__) {
        try {
            const result = await AsyncStorage.getItem(LOCAL_URL);
            if (result && (result.length > 0)) {
                items.push({
                    title: MANUAL_URL,
                    url: result,
                });
            } else {
                items.push({
                    title: MANUAL_URL,
                    url: Config.API_TEST_URL,
                });
            }
        } catch (error) {
            items.push({
                title: MANUAL_URL,
                url: Config.API_TEST_URL,
            });
        }
    }
    return items;
}

//설정한 서버 목록의 index 읽기
async function GetServerIndex() {
    try {
        const idx = await AsyncStorage.getItem(SAVE_INDEX_URL);
        if (idx) {
            index = parseInt(idx);
        } else {
            index = 0;
        }
    } catch (error) {
        index = 0;
    }

    return index;
}

//서버 목록에 설정 index 저장
async function SetSaveIndex(index) {
    try {
        await AsyncStorage.setItem(SAVE_INDEX_URL, index.toString());
        console.log("SaveIndex() index: ", index);
    } catch (error) {
        console.error("SaveIndex() err: ", error);
    }
}

//직접입력 URL 저장
async function SetSaveLocalUrl(url) {
    try {
        await AsyncStorage.setItem(LOCAL_URL, url);
        console.log("SetSaveLocalUrl() url: ", url);
    } catch (error) {
        console.error("SetSaveLocalUrl() err: ", error);
    }
}

function initServerUrl() {
    if (__DEV__) {//리얼 버전은 서버 변경이 없을 것이다.
        GetServerList()
            .then(result => {
                if (result && (result.length > 0)) {
                    GetServerIndex()
                        .then(index => {
                            if (index) {
                                console.log("initServerUrl() index: ", index);
                                setConfigUrl(result[index].url);
                            }
                        })
                        .catch(err => {
                            setConfigUrl([0]);
                        })
                } else {
                    setConfigUrl("");
                }
            })
            .catch(err => {
                //nothing any
                setConfigUrl("");
            });
    }
}

function setConfigUrl(url) {
    console.log("setConfigUrl() url: ", url);
    Config.API_URL = url;
}

class CategoryData {
    static getFoodHomeData() {
        const url = `${Config.API_URL}/mobile/users/getFoodsHome.do`;
        console.log("getFoodHomeData() url = " + url);

        return fetch(url, {
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
        const url = `${Config.API_URL}/mobile/users/getMainBestVendorList.do`;
        console.log("getMainBestVender() url = " + url);
        return fetch(url, {
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
        const url = `${Config.API_URL}/mobile/users/getVendor.do`;
        console.log("getVenderDetail() url = " + url);
        return fetch(url, {
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
                Authorization: "KakaoAK d79e0c1754cd3b420bfb18d109d04e61"
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
                Authorization: "KakaoAK d79e0c1754cd3b420bfb18d109d04e61"
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
        const url = `${Config.API_URL}/mobile/users/getTerms.do`;
        console.log("getVenderDetail() url = " + url);
        return fetch(url, {
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

export {
    CategoryData,
    GetServerList,
    GetServerIndex,
    SetSaveIndex,
    initServerUrl,
    setConfigUrl,
    MANUAL_URL,
    SetSaveLocalUrl
}; 