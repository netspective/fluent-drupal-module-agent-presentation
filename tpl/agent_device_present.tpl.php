<script type="text/javascript">
var action = "<?php print $action;?>";
var device = "<?php print $device;?>";
var obj = new DEVICE;

$(document).ready(function() {
	if(action != "remote-view-status") {
		getdevice("<?php print $device; ?>");
		connect("<?php echo $settings['host'];?>","<?php echo $settings['port'];?>","<?php print $domain; ?>");
	} else {
		$('#messages-content').html('[Connecting...]')
		obj.connect("<?php echo $settings['host'];?>","<?php echo $settings['port'];?>","device");
		setInterval(senddevice,6000);
	}
});

function senddevice() {
	$('#messages-content').html('[Sending Request...]')
	obj.dlist_send();
	var list = obj.putvaluehere();
	if(list == null) { return; }
	var device_list = list.split(",");

	var flag = 0;
	for(var i=0; i<device_list.length; i++) {
		if(device_list[i] == '') { continue; }
		if(device_list[i] == device) {
			flag = 1;
		}
	}
		if(flag==1)	$('#messages-content').html('START');
		else $('#messages-content').html('STOP');
}


</script>		
<table id="device_list">
  <thead>
    <tr>
      <th><?php print t('Domains'); ?></th>
    </tr>
  </thead>
  <tbody>
    <tr id="device-list">
	<?php if($action == "remote-view-status") { ?>
      <td>Domain: <?php print $domain;?> <br />
		  Device: <?php print $device;?> <br />
		  Status: <span id="messages-content"></span></td>
	<?php } ?>
	<?php if($action == "remote-view-real-time") { ?>
      <td>
		<div id="messages-content"></div></td>		  
       <td valign="top">
		<div id="device-stat" >
		<h2>Device Statistics</h2>
			 <h3> Start Time </h3> <span id="start_time">00:00:00</span>
			 <h3> Current  Time </h3> <span id="nxt_time">00:00:00</span>
			 <h3> Total Bytes Recevied </h3> <span id="total_bytes">0</span> KBytes
			 <h3> Total Number of Devices </h3>  <span id="total_devices">0</span>
			 <h3> Size of a message</h3> <span id="msg_size">0 </span> KBytes
			 <h3> Total Messages</h3> <span id="total_msg">0</span>
			 <h3> Average Bytes Per Message</h3> <span id="avg">0.0 </span></b> KBytes
			 <h3> Messages Per Minute</h3> <span id="tempmesg">0</span>
			 <h3> Available Devices </h3>  <span id="devices"></span>
		</div>
	</td>
	<?php } ?>
	</tr>  
  </tbody>
</table>