	
				var ws;
				var url;
				var msgsize;
				var avgbytes;
				total_msgs=0;
				tim_diff=0
				sec_tim=0;
				sec_dat=0;
				sec_hrs=0;
				sec_min=0;
				sec_secs=0;
				time1=0;
                		timediff=0;
				count=0;



				var xVal = 0;
				var timestamp = 0;
				var countarr = 0;
				var temp = 0;
				
				var device_id = "<?php echo $_GET['device_id'];?>";
				
				var series1 = new Array();
				var series2 = new Array();
				var series3 = new Array();
				var datalength = 0;
				var vdat = new Array();
			        var options = {legend: { show: true, position: "nw" },grid: { hoverable: true, clickable: true }	};
			        var plot = new Array();
				var arr = new Array();
				var total=0;
				var curr_tim = new Date();
				var hours = curr_tim.getHours();
				var minute = curr_tim.getMinutes();
				var seconds =curr_tim.getSeconds();
				var sec_tim;
				if(seconds<=9)
				seconds="0"+seconds;
				if(minute<=9)
				minute="0"+minute;
				if(hours<=9)
				hours="0"+hours;
				var sec_tim;
				st_time=hours+":"+minute+":"+seconds+"";
				var host_url = "";
				var port = "";
				
function getdevice(device) {
	device_id = device;
}	

function checkmodule(status) {	
	module_status = status;
}

function connect(host_url, port, type) {
    url = "ws://"+host_url+":"+port+"/pulse";
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
		
		/*msgsize=e.data.length/1024;
		total_msgs++;
		datalength=datalength+(e.data.length/1024);
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
		msgsize=message.length/1024;
		total_msgs++;
		datalength=datalength+(message.length/1024);
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
		 temp=0;
		}
		count++;
	var countarr = $.inArray(values[1], arr);
	temp = countarr;
	if(countarr=="-1") { 
			var block = "block"+total;
			$('<div/>', {
			id: block,
			class: "block_class"  
			}).appendTo('#messages-content');

			$('<h2/>', {
			id: "heading"+total,  
			}).appendTo('#'+block);
			
			$("#heading"+total).html("Record for "+values[1]);
			$('#devices').append(values[1]+"<br /><br />");
			$('#devices_list').append("<a href='javascript:void()' onclick=\"linkedlist('"+total+"')\">"+values[1]+"</a><br /><br />");

			$('<div/>', {
			id: "chart"+total,  
			class: "chart_div",  
			css: {  
				width:'550px',
				height:'360px'  
			}
			}).appendTo('#'+block);
			
			$('<div/>', {
			id: "summary"+total,  
			class: "summary",  
			}).appendTo('#'+block);

			$('<div/>', {
			id: "clear"+total,  
			css: {  
				clear:'both'
			}
			}).appendTo('#'+block);
			
			if(module_status == 1) {
				$('<div/>', {
				id: "button",  
				}).appendTo('#'+block);
				$('#'+block +' #button').html("<input type='button' onclick='javascript:stopservice(\""+values[0]+"\",\""+values[1]+"\",\"STOP\")' value='stop' \/>");
			}
			

		series1[total] = { label: "SPO2", data: [] };
		series2[total] = { label: "PULSE RATE", data: [] };

		vdat[total] = [ series1[total], series2[total] ];
		arr.push(values[1]); 
		plot[total] = $.plot($("#chart"+total), vdat[total], options);
		temp = total;
		total++;
		$('#total_devices').html(temp+1);
	}
	if(total!=0) {
		getData(values[3], values[4], values[5], values[2], temp,"#chart"+temp);
	}



					var status = "<h3>ALERT</h3>";
				
					if(values[3]<100)
						status += "<font color='red'>SPO2: "+values[3]+", LOW </font><br />";
                                        else if(values[3]>200)
						status += "<font color='red'>SPO2: "+values[3]+", HIGH </font><br />";
					else 
						status += "<font color='green'>SPO2: "+values[3]+", NORMAL </font><br />";
                                          
                                        if(values[4]<80)
						status += "<font color='red'>PULSE RATE: "+values[4]+", LOW </font><br />";

                                        else if(values[4]>200)
						status += "<font color='red'>PULSE RATE: "+values[4]+", HIGH </font><br />";

				  	else
						status +="<font color='green'>PULSE RATE: "+values[4]+", NORMAL</font> <br />";
						
					
	$('#start_time').html(st_time);	
	$('#nxt_time').html(sec_tim);	
	$('#total_bytes').html(datalength.toFixed(3));
	$('#msg_size').html(msgsize.toFixed(4));
	$('#avg').html(avgbytes.toFixed(4));
	$('#total_msg').html(total_msgs);
	$("#summary"+temp).html(status);
	
}

function disconnect() {
	eraseCookie('cookie_value');
	
	ws.close();
	chat_message("Closed");
}


function toggle_connect() {
		connect();
}

function send() {
	if (ws === undefined || ws.readyState != 1) {
		chat_message("Websocket is not avaliable for writing");
		return;
	}
	
	ws.send("pulseox");
}


function getData(values3, values4, values5, timestamp, countarr,lab){
					// This could be an ajax call back.
					var yVal1 = values3;
					var yVal2 = values4;
					

					var datum1 = [xVal, yVal1];
					var datum2 = [xVal, yVal2];
					

					vdat[countarr][0].data.push(datum1);
					vdat[countarr][1].data.push(datum2);
					
					if(vdat[countarr][0].data.length>10){
						// only allow ten points
						vdat[countarr][0].data = vdat[countarr][0].data.splice(1);
						vdat[countarr][1].data = vdat[countarr][1].data.splice(1);
						
					}
					xVal++;
					plot[countarr].setData(vdat[countarr]);
					plot[countarr].setupGrid();
					plot[countarr].draw();
				}
