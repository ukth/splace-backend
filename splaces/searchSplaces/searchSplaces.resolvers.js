require("dotenv").config();
const { Client } = require('pg');

const client = new Client({
  user: process.env.USERNAME,
  host: process.env.DBURL,
  database: process.env.DB,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

client.connect();

export default {
  Query: {
    searchSplaces: async (_, { keyword }) => {
      const sql = "SELECT SPLACEID \
      FROM(SELECT \
          (CASE WHEN 1 * 10 < COUNT(*) OVER() THEN 'FALSE' WHEN 1 * 10 >= COUNT(*) OVER() THEN 'TRUE' END) AS END_PAGE, \
          CAFE_ID, CAFE_NM, CAFE_IMG_NM, CAFE_IMG_DIR, PRICE, LUNCH_YN, DINNER_YN, OPER_TIME, BUILD_ADDR, BUILD_NM, BUILD_TEL, \
          BUILD_HOME, BUILD_KEY,BUILD_X, BUILD_Y, \
          (SELECT ROUND(AVG( COMMENT_SCORE),1) FROM PUBLIC.CAFE_COMMENT WHERE CAFE_ID=CAFE.CAFE_ID GROUP BY CAFE_ID) AS BUILD_SCORE, \
          (select earth_distance(ll_to_earth(37.483422, 126.891111), ll_to_earth(CAFE.BUILD_X,CAFE.BUILD_Y))) AS DISTANCE, \
          USE_YN, INS_USER_DTM, UPD_USER_DTM \
          FROM PUBLIC.CAFE AS CAFE \
          ORDER BY DISTANCE ASC \
          LIMIT 10 OFFSET (1 - 1) * 10 \
      ) SPLACE";
      const values = ['id', 'name', 'nickname', 'email', 'pw', 'favorite_type', 'favorite_country'];

      client.query(sql, values, (err, res) => {
        if (err) {
          console.log(err.stack)
        } else {
          console.log(res.rows[0])
        }
      });
    }
  },
};
