export class userAuth{
    isLoggedIn:boolean = false;
    userDetails:any = {};

    init(){
        if(localStorage.getItem("token") != null){
            this.userDetails = JSON.parse(atob(localStorage.getItem("token").split('.')[1]));
            if(this.isTokenValid()){
                this.isLoggedIn = true;
            }else{
                this.userDetails = {};
                localStorage.clear();
            }
        }else{
            this.isLoggedIn = false;
            this.userDetails = {};
        }
    }

    public isTokenValid():boolean{
        if(typeof this.userDetails.exp === "undefined")
            return false;

        return ((new Date().getTime()/1000) < this.userDetails.exp);
    }

    public getFullName():string{
        return (this.userDetails.firstName + " " + this.userDetails.lastName);
    }
}