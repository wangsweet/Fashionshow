<?php
header("Content-type:text/html;charset=UTF-8");
//访问数据库
class Mysql{
  private static $host="localhost";
  private static $user="root";
  private static $password="16113710141";
  private static $dbName="show";           //数据库名
  private static $charset="utf8";          //字符编码
  private static $port="3306";            //端口号
  private $conn=null;
  function __construct(){
    $this->conn=new mysqli(self::$host,self::$user,self::$password,self::$dbName,self::$port);
    if(!$this->conn)
    {
       die("数据库连接失败！".$this->conn->connect_error);
    }else{
      echo "连接成功！";
    }
    $this->conn->query("set name".self::$charset);
  }
  //执行sql语句
  function sql($sql){
    $res=$this->conn->query($sql);
  if(!$res)
    {
       echo "数据操作失败";
    }
    else
    {
       if($this->conn->affected_rows>0)
       {
          return $res;
       }
       else
       {
         echo "0行数据受影响！";
       }
    }
  }
  //返回受影响数据行数
  function getResultNum($sql){
   $res=$this->conn->query($sql);
   return mysqli_num_rows($res);
   }
  //关闭数据库
  public function close()
  {
    @mysqli_close($this->conn);
  }
}
session_start();        //开启会话一获取到服务器端验证码
$username=$_POST['username'];
$password=$_POST['password'];
$autologin=isset($_POST['autologin'])?1:0;   //获取是否选择了自动登录
/*
 * 首先进行判空操作，通过后进行验证码验证，通过后再进行数据库验证。
 * 手机号码和邮箱验证可根据需要自行添加
 * */
if(checkEmpty($username,$password)){
    if(checkUser($username,$password)){
      $_SESSION['username']=$username; //保存此时登录成功的用户名
      if($autologin==1){        //如果用户勾选了自动登录就把用户名和加了密的密码放到cookie里面
        setcookie("username",$username,time()+3600*24*3);  //有效期设置为3天
        setcookie("password",md5($password),time()+3600*24*3);
      }
      else{
        setcookie("username","",time()-1);  //如果没有选择自动登录就清空cookie
        setcookie("password","",time()-1);
      }
      header("location: ../index.html?".$username);      //全部验证都通过之后跳转到首页
    }
}
//方法：判断是否为空
function checkEmpty($username,$password){
  if($username==null||$password==null){
    echo '<html><head><Script Language="JavaScript">alert("用户名或密码为空");</Script></head></html>' . "<meta http-equiv=\"refresh\" content=\"0;url=../login.html\">";
  }else{
      return true;
    }
}
//方法：查询用户是否在数据库中
function checkUser($username,$password){
  $conn=new Mysql();
  $sql="select * from user where username='{$username}' and password='{$password}';";
  $result=$conn->sql($sql);
  if($result){
    return true;
  }
  else{
    echo '<html><head><Script Language="JavaScript">alert("用户不存在");</Script></head></html>' . "<meta http-equiv=\"refresh\" content=\"0;url=../login.html\">";
  }
  $conn->close();
}