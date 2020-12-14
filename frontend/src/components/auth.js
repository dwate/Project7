import jwtDecode from 'jwt-decode';  
      
      
      
      
      class Authentication {
          constructor() {
            this.authz = false;
        }
          
        loginCheck() {
         
          const token = localStorage.getItem("authtoken");
          if(token){
          const decodedToken = jwtDecode(token);
          var currentTime = Date.now();
         // console.log(decodedToken);
              if(decodedToken.exp *1000 <currentTime){
              
              this.authz = false;
             // console.log('false', this.authz);
              
              } else {
              this.authz = true;
             // console.log('true', this.authz);
              
              }
          }
          else {
        //  console.log('end false');
          this.authz = false;
          };
        }


      }
      
     

        export default new Authentication();