class Notification{

    success(){
        new Noty({
      theme: 'sunset',
      type: 'success',
      layout: 'topRight',
      text: 'Successfully Done!',
      timeout: 1500,
         }).show();
    }

    mailSent(){
        new Noty({
      theme: 'sunset',
      type: 'info',
      layout: 'topRight',
      text: 'Mail Sent!',
      timeout: 1500,
         }).show();
    }

    alert(){
        new Noty({
        theme: 'sunset',
      type: 'alert',
      layout: 'topRight',
      text: 'Are you Sure?',
      timeout: 1500,
         }).show();
    }



    error(){
        new Noty({
        theme: 'sunset',
      type: 'alert',
      layout: 'topRight',
      text: 'Something Went Wrong! ',
      timeout: 1500,
         }).show();
    }


   warning(){
        new Noty({
        theme: 'sunset',
      type: 'warning',
      layout: 'topRight',
      text: 'Opps Wrong!',
      timeout: 1500,
         }).show();
    }



    image_validation(){
      new Noty({
        theme: 'sunset',
      type: 'error',
      layout: 'topRight',
      text: 'Upload Image less then 1MB ',
      timeout: 1500,
         }).show();
    }



      cart_success(){
      new Noty({
        theme: 'sunset',
      type: 'success',
      layout: 'topRight',
      text: 'Successfully Add to Cart!',
      timeout: 1500,
         }).show();
    }


     cart_delete(){
      new Noty({
        theme: 'sunset',
      type: 'success',
      layout: 'topRight',
      text: 'Successfully Deleted!',
      timeout: 1500,
         }).show();
    }



  }

  export default Notification = new Notification()
