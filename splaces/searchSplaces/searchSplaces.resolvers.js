import client from "../../client";;

export default {
  Query: {
    searchSplaces: async (_, { keyword, lat, long }) => {
      try {
        const starts = keyword + '%'
        const result = await client.$queryRaw`SELECT 
        *,
        ENDPAGE,
        ROUND(CAST(DISTANCE AS NUMERIC),0) AS DISTANCE
        FROM(                                                             
        SELECT 
            (CASE WHEN 1 * 10 < COUNT(*) OVER() THEN 'FALSE' 
                 WHEN 1 * 10 >= COUNT(*) OVER() THEN 'TRUE' END) AS ENDPAGE,
            *,
            (select earth_distance(ll_to_earth(${lat}, ${long}), ll_to_earth(s.geolat,s.geolog))) AS DISTANCE
        FROM "public"."Splace" AS s
        WHERE s.name LIKE ${starts}
        ORDER BY DISTANCE ASC
        LIMIT 10 OFFSET (1 - 1) * 10
        ) Splace`
        return {
          ok: true,
          searchedSplaces: result
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "cant search splace"
        }
      }
    }
  },
};
