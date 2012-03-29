<script type="text/javascript">
checkmodule("<?php print $status;?>");
getdevice("<?php print $device; ?>");

<?php if($status == '1') { ?>
	var obj = new DEVICE;
<?php } ?>

$(document).ready(function() {
	connect("<?php echo $settings['host'];?>","<?php echo $settings['port'];?>","<?php print $domain; ?>");
});

function stopservice(val1, val2, action) {
	obj.connect("<?php echo $settings['host'];?>","<?php echo $settings['port'];?>","device");
	setTimeout("senddevice('"+action+"','"+val1+"','"+val2+"')",6000);
}

function senddevice(action,val1,val2) {
	if(action == "START") {
		obj.send("'"+val1+":"+val2+"'");
	} else {
		obj.send_stop("'"+val1+":"+val2+"'");
	}
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
	</tr>  
  </tbody>
</table>
