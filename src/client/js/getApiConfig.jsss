jest.useFakeTimers();

const getConfig = async () => {
    const response = await fetch('http://localhost:8081/readConfig');

    try {
        console.log("getConfig Api Call ");
        const ret = await response.json();
        //console.log(ret);

        return await ret;
    } catch (error) {
        console.log("getConfig Api Call error");
        console.log("error", error);
    }
}
export { getConfig }
