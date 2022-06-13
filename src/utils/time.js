export const subDateTime = (strTime) => {
    let index = strTime.indexOf("T");
    return strTime.substr(0, index);
};

export const subTime = (strTime) => {
    let index = strTime.indexOf("T");
    return (strTime.substr(0, index) + " " + strTime.substr(index + 1, strTime.length));
};

export const remainTime = (strTime) => {
    strTime = strTime.replace(/-/g, '/');
    var date = new Date(strTime)
    var nowDate = new Date()
    var remainDate = date.getTime() - nowDate.getTime()
    // console.log(remainDate)
    if (remainDate < 1000) {
        return " ";
    }

    //计算出相差天数
    var days = Math.floor(remainDate / (24 * 3600 * 1000))

    //计算出小时数

    var leave1 = remainDate % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000))
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000))


    //计算相差秒数
    var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000)

    return (" 距开始还剩 " + days + " 天 " + hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒");
}
export const remainSnapTime = (strTime) => {
    // strTime = strTime.replace(/-/g, '/');
    var date = new Date(strTime)
    var nowDate = new Date()
    var remainDate = date.getTime() - nowDate.getTime()
    // console.log(remainDate)
    if (remainDate < 1000) {
        return " ";
    }

    //计算出相差天数
    var days = Math.floor(remainDate / (24 * 3600 * 1000))

    //计算出小时数

    var leave1 = remainDate % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000))
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000))


    //计算相差秒数
    var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000)

    return (" 距抢购结束还剩 " + minutes + " 分钟 " + seconds + " 秒");
}