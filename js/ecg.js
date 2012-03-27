				var ws;
				var curr_time = new Date();
				var hours = curr_time.getHours();
				var minute = curr_time.getMinutes();
				var sec=curr_time.getSeconds();
				var temp1 = 0;
				var st_time;
				var total_msgs=0;
				var avgbytes=0.0;
				var url;
				var msgsize=0;
				var count=0;
				var merid = "";
				tim_diff=0
				sec_tim=0;
				sec_dat=0;
				sec_hrs=0;
				sec_min=0;
				sec_secs=0;
				time1=0;
                		timediff=0;


				if(sec<=9)
				sec="0"+sec;
				if(minute<=9)
				minute="0"+minute;
				if(hours<=9)
				hours="0"+hours;

				var sec_tim;
	
				st_time=hours+":"+minute+":"+sec;

				var xVal = 0;
				var timestamp = 0;
				var countarr = 0;
				var temp = 0;
				
				var device_id = "<?php echo $_GET['device_id'];?>";
				var series1 = new Array();
				var series2 = new Array();
				var series3 = new Array();
				var datalength = 0;
				var m_count=0;
				//var vdat = [ series1, series2, series3 ];
			
				var data = [];
				var datax = [];
			    
			        var options = 
			    	{
			      		series: { shadowSize: 0 }, 
			        	yaxis: { min: -1, max: 1 },
			        	xaxis: { show: false, mode: "time" }
			   	};

				var arr = new Array();
				var total=0;
				
function getdevice(device) {
	device_id = device;
}	

function checkmodule(status) {	
	module_status = status;
}

function connect(host_url, port, type) {
    url = "ws://"+host_url+":"+port+"/bp";
	console.log(url);
	
	if ("WebSocket" in window) {
		ws = new WebSocket(url);
	} else if ("MozWebSocket" in window) {
		ws = new MozWebSocket(url);
	} else {
		chat_message("This Browser does not support WebSockets");
		return;
	}
	ws.onopen = function(e) {
		chat_message("A connection to "+url+" has been opened.");

		var cookie_val = readCookie('cookie_value');
		if(!cookie_val) { createCookie('cookie_value','set',1); send(); }
		else {disconnect(); connect(host_url, port, type);  }
		
		
	};
	
	ws.onerror = function(e) {
		chat_message("An error occured, see console log for more details.");
		console.log(e);
	};
	
	ws.onclose = function(e) {
		chat_message("The connection to "+url+" was closed.");
	};
	
	ws.onmessage = function(e) {
		var message = JSON.parse(e.data);
		
		/*datalength=datalength+(e.data.length/1024);
		   msgsize=e.data.length/1024;
		 total_msgs++;
		 avgbytes=datalength/total_msgs;*/
		if (message.type == "msg") {
			if(device_id) { 
				var message_string = message.value;
				var status = message_string.indexOf(device_id);
				if(status != "-1") { chat_message2(message.value,message.sender); }
				else {chat_message(status+device_id+"sorry not found"+"-----"+message.value,message.sender);}
			} else {
				chat_message2(message.value,message.sender);
				
			}
		} else if (message.type == "participants") {}
	};
}

function chat_message(message,sender) {
	if (arguments.length == 1) {
		sender = "";
	}
	
	var style;
	
	if (sender == "") {
		style = "client";
	} else if (sender == "server") {
		style = "server";
		sender = "["+sender+"]";
	} else {
		style = "message";
		sender = "["+sender+"]";
	}
}

function chat_message2(message,sender) {
	if (arguments.length == 1) {
		sender = "";
	}
	
	var style;
	
	if (sender == "") {
		style = "client";
	} else if (sender == "server") {
		style = "server";
		sender = "["+sender+"]";
	} else {
		style = "message";
		sender = "["+sender+"]";
	}
	if(message == "connected" || message == "DLIST" || message == "dynamiclist") { chat_message(message,sender);  return;}
	
  		//CHANGES ARE HERE//
		datalength=datalength+(message.length/1024);
                msgsize=message.length/1024;
		total_msgs++;
		avgbytes=datalength/total_msgs;
	var values = message.split(",");
		sec_dat= new Date();
		second_tim=sec_dat.getTime();
  		sec_hrs=sec_dat.getHours();
		sec_min=sec_dat.getMinutes();
		sec_secs=sec_dat.getSeconds();
		if(sec_secs<=9)
		sec_secs="0"+sec_secs;
		if(sec_min<=9)
		sec_min="0"+sec_min;
		if(sec_hrs<=9)
		sec_hrs="0"+sec_hrs;

		sec_tim=sec_hrs+":"+sec_min+":"+sec_secs;
		
		if(count==0)
		{
		time1=second_tim;
		}
		
		timediff=second_tim-time1;
		//alert(second_tim+" "+time1);
		
		if(timediff>=60000)
                {
		//alert(timediff);	
		 $('#tempmesg').html(count);
		  time1=second_tim;
		 count=0;
		 temp1=0;
		}
		count++;
	var countarr = $.inArray(values[1], arr);
	if(countarr == "-1")
	{
		$('<div/>', {
			id: "placeholder",  
			class: "chart_div",  
			css: {  
				width:'550px',
				height:'360px'  
			}
			}).appendTo('#messages-content');		
			
			if(module_status == 1) {
				$('<div/>', {
				id: "button",  
				}).appendTo('#messages-content');
				$('#messages-content #button').html("<input type='button' onclick='javascript:stopservice(\""+values[0]+"\",\""+values[1]+"\",\"STOP\")' value='stop' \/>");
			}
			
		$("#heading"+total).html("Record for "+values[1]);
		$("#total_devices").html(total++);
		$('#deviceheading').append(values[1]+"<br/><br/>");
		$('#devices').append(values[1]+"<br/><br/>");
		$('#devices_list').append("<a href='javascript:void()' onclick=\"linkedlist('"+total+"')\">"+values[1]+"</a><br /><br />");
		arr.push(values[1]); 



	}

	
	var y = values[4];
	var x = values[3];
	
      	
	if ( data.length > 1000)
	{
			
		        data = data.slice(1);
			datax = datax.slice(1);
	}
	
	
 	data.push(y);
	datax.push(x);
 	var res = [];
	m_count++;
        for (var i = 0; i < data.length; ++i) 
	{
        	res.push([datax[i],data[i]]);
	}

	if(m_count==400) {
	var plot = $.plot($("#placeholder"), [ res ], options);
	
	plot.setData([ res ]);
        plot.draw();
	m_count=0;
	}
	
	$('#start_time').html(st_time);	
	$('#nxt_time').html(sec_tim);			
	$('#total_bytes').html(datalength.toFixed(3));
	$('#msg_size').html(msgsize.toFixed(4));
	$('#total_devices').html(1);
	$('#total_msg').html(total_msgs);
	$('#avg').html(avgbytes.toFixed(4));
	
}

function disconnect() {
	eraseCookie('cookie_value');
	
	ws.close();
	chat_message("Closed");
}

function send() {
	if (ws === undefined || ws.readyState != 1) {
		chat_message("Websocket is not avaliable for writing");
		return;
	}
	
	ws.send("ecg");
}
