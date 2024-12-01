import React, { useState, useEffect } from "react";
import styles from "./styles/ColorRank.module.css";

function ColorRank() {
    // Loading 상태 변수 추가
    const [loading, setLoading] = useState(true);

    // API 호출을 통해 데이터를 가져오는 함수
    const fetchData = async () => {
        try {
            const response = await fetch("http://152.67.211.81:8000/datas");
            const data = await response.json();

            // data에 랭킹을 컬럼추가
            data.forEach((item, index) => {
                item.rank = index + 1;
            });

            setItems(data || []);  // items 데이터를 상태로 저장
            setLoading(false);  // 데이터 로딩 완료 후 loading 상태 변경
        } catch (error) {
            console.error("데이터를 불러오는 데 실패했습니다:", error);
            setLoading(false);  // 에러가 발생해도 로딩 상태 변경
        }
    };

    // 데이터를 저장할 상태 변수
    const [items, setItems] = useState([]);
    const [serchItems, setSearchItems] = useState('');

    // 컴포넌트가 처음 렌더링될 때 데이터를 불러오는 effect
    useEffect(() => {
        fetchData();
    }, []);

    // 검색어 입력 change 이벤트 핸들러
    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchItems(value);
    };

    // 검색어에 맞는 항목만 필터링
    const filteredItems = items.filter(item =>
        item.nickname.toLowerCase().includes(serchItems.toLowerCase())
    );

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>검닉 랭킹</h1>
            <div className={styles.inputflex}>
                <input
                    type="text"
                    placeholder="유저 검색"
                    className={styles.input}
                    value={serchItems}
                    onChange={handleInputChange}
                />
            </div>

            {/* 로딩 상태에 따른 표시 */}
            {loading ? (
                <div className={styles.loadingSpinner}>
                    <div className={styles.spinner}></div>
                </div>
            ) : (
                <div className={styles.ColorRankContainer}>
                    <table className={styles.ColorRank}>
                        <thead>
                            <tr>
                                <th>랭킹</th>
                                <th>이름</th>
                                <th>색상(Hex)</th>
                                <th>점수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems.map((item, index) => (
                                <tr key={index + 1} data-name={item.nickname}>
                                    <td style={item.nickname === "주히" ? {backgroundColor :`#f7cbcb`} : null}>{item.rank}위</td>
                                    <td>{item.nickname}</td>
                                    <td className={styles.inputflex}>
                                        <div
                                            className={styles.colorblock}
                                            style={{ backgroundColor: `#${item.color}` }}
                                        ></div>
                                        {item.color}
                                    </td>
                                    <td>{item.closeness}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default ColorRank;