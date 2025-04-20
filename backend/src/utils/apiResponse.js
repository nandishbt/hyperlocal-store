class apiResponse{
    constructor(success,statusCode,message,data=null){
        this.success = success
        this.status = statusCode
        this.message = message
        this.data = data
    }
}

export default apiResponse