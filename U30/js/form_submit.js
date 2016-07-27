$(function(){
    var submit = $("#get");
     //文本框失去焦点后
    $('form :input').blur(function(){
    	var parent = $(this).parent();
        parent.find(".formtips").remove();
         //验证用户名
		if( $(this).is('#contact_name') ){
		    if( this.value=="" || this.value.length < 6 ){
		        var errorMsg = '请输入至少6位的用户名.';
		        parent.append('<span class="formtips onError" style="color:red;">'+errorMsg+'</span>');
		    }else{
		        parent.find(".onError").remove();
		    }
		}
		//验证邮件
		if( $(this).is('#contact_email') ){
			if( this.value=="" || ( this.value!="" && !/.+@.+\.[a-zA-Z]{2,4}$/.test(this.value) ) ){
				var errorMsg = '请输入正确的E-Mail地址.';
				parent.append('<span class="formtips onError" style="color:red;">'+errorMsg+'</span>');
			}else{
			    parent.find(".onError").remove();
			}
		}
		if( $(this).is("textarea")){
			if(!$(this).val()){
				var errorMsg = "此处不能为空";
				parent.append('<span class="formtips onError" style="color:red;">'+errorMsg+"</span>");
			}
		}
    }).keyup(function(){
        $(this).triggerHandler("blur");
    }).focus(function(){
        $(this).triggerHandler("blur");
    });
    
    //提交，最终验证。
    submit.bind("click",function(){
		var contact = $(this).siblings('#contact'),
			input_name = contact.find("#contact_name"),
			input_email = contact.find("#contact_email"),
			textarea = contact.find("textarea"),
			numError = contact.find('form .onError').length,
			comment = $(this).siblings('.comment_main'),
			user_name = comment.find(".user_name"),
			user_comment = comment.find(".user_comment");
		$("form :input.required").trigger('blur');
        if(numError){
            return false;
        } 
        var newgrid ="<div class='user'><div class='user_img'><img src='images/38.jpg'></div><div class='text'><div class='text_heading'><a href='' class='user_name'>"+input_name.val()+"</a><span><img src='images/37.jpg'>1天前</span></div><p class='user_comment'>"+textarea.val()+"</p></div></div>";
        $(comment).append(newgrid);
		$.ajax({
			url:"",
			type:"POST",
			dataType:"json",
			data:{
				input_name:input_name.val(),
				input_email:input_email.val(),
				textarea:textarea.val()
			},
			success:function(data){
				if(data.status==1){
					alert("您的表单已提交成功！");
					$(this).parent().find(contact).find("form :input.required").each(function(){
			            $(this).val("");
			        });
			        $(textarea).val("");
				}
				if(data.status==2){
                    alert("表单不可以重复提交！");
                }
			}

		})
	})

        
})