$(document).ready(function(){
	var form = $(".regist_form"),
		regist_name = $("input[name='regist_name']"),
		regist_email = $("input[name='regist_email']"),
		regist_pwd = $("input[name='regist_pwd']"),
		regist_repwd = $("input[name='regist_repwd']"),
		regist_btn = $(".regist_btn");
	$("form :input").blur(function(){
		var parent = $(this).parent();
        parent.find(".formtips").remove();
         //验证用户名
		if( $(this).is("input[name='regist_name']") ){
		    if( this.value=="" || this.value.length < 6 ){
		        var errorMsg = '请输入至少6位的用户名.';
		        parent.append('<p class="formtips onError" style="text-align: center;margin: -15px 0;color: red;">'+errorMsg+'</p>');
		    }else{
		        parent.find(".onError").remove();
		    }
		}
		//验证邮件
		if( $(this).is("input[name='regist_email']") ){
			if( this.value=="" || ( this.value!="" && !/.+@.+\.[a-zA-Z]{2,4}$/.test(this.value) ) ){
				var errorMsg = '请输入正确的E-Mail地址.';
				parent.append('<p class="formtips onError" style="text-align: center;margin: -15px 0;color: red;">'+errorMsg+'</p>');
			}else{
			    parent.find(".onError").remove();
			}
		}
		if( $(this).is("input[name='regist_pwd']")){
			if(this.value.length<6||this.value.length>16){
				var errorMsg = "密码应该在6-16个字符之间.";
				parent.append('<p class="formtips onError" style="text-align: center;margin: -15px 0;color: red;">'+errorMsg+'</p>');
			}else{
				parent.find(".onError").remove();
			}
		}
		if( $(this).is("input[name='regist_repwd']")){
			if(this.value!=regist_pwd.val()){
				var errorMsg = "第二次密码和第一次不符，请检查后输入.";
				parent.append('<p class="formtips onError" style="text-align: center;margin: -15px 0;color: red;">'+errorMsg+'</p>');
			}else{
				parent.find(".onError").remove();
			}
		}
	}).keyup(function(){
        $(this).triggerHandler("blur");
    }).focus(function(){
        $(this).triggerHandler("blur");
    });
    //提交，最终验证。
    regist_btn.bind("click",function(){
		$("form :input.required").trigger('blur');
        if(numError){
            return false;
        } 
		$.ajax({
			url:"",
			type:"POST",
			dataType:"json",
			data:{
				regist_name:regist_name.val(),
				reigst_email:reigst_email.val(),
				regist_pwd:regist_pwd.val()
			},
			success:function(data){
				if(data.status==1){
					alert("您的表单已提交成功！");
					$(this).parent().find(regist_pwd).find("form :input.required").each(function(){
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
});