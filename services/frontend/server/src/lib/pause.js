// @flow

const pause = async (time: number): Promise<any> =>
    new Promise(resolve => setTimeout(resolve, time))

export default pause
