import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";

// ✅ Gunakan path relatif, biar ngelewatin proxy Vite
const API_URL = "/api/";

function useApi(request, { autoFetch = true } = {}) {
    const isSingle = !Array.isArray(request);

    // ✅ Jaga supaya stabil antar render
    const requestArray = useMemo(
        () => (isSingle ? [request] : request),
        [JSON.stringify(request)]
    );

    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(autoFetch);
    const [error, setError] = useState(null);

    // ✅ Fungsi utama untuk GET (atau multi request)
    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await Promise.all(
                requestArray.map(({ method = "get", url, data = null }) =>
                    axios({
                        method,
                        url: `${API_URL}${url}`,
                        data,
                        headers: { Accept: "application/json" },
                    })
                )
            );
            setResponses(res.map(r => r));
            return res;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [requestArray]);

    // ✅ Auto fetch hanya jika diizinkan
    useEffect(() => {
        if (autoFetch) fetchData();
    }, [fetchData, autoFetch]);

    // ✅ Manual execute untuk POST / PUT / DELETE
    const execute = useCallback(async (customRequest) => {
        setLoading(true);
        setError(null);
        try {
            const req = { ...requestArray[0], ...customRequest };
            const res = await axios({
                method: req.method,
                url: `${API_URL}${req.url}`,
                data: req.data,
                headers: { Accept: "application/json" },
                withCredentials: true,
            });

            setResponses([res]);
            return res;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [requestArray]);

    return {
        response: isSingle ? responses[0] : responses,
        loading,
        error,
        refetch: fetchData, // GET ulang
        execute,            // POST, PUT, DELETE manual
    };
}

export default useApi;
