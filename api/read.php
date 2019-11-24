<?php
/*
php代码的推荐语法格式:<?php coding ?>，以尖括号问号php开头，问号尖括号结束，coding表示php代码区。
*/
header("content-type:text/html;charset=utf-8");         //设置编码解决中文乱码问题
header('Access-Control-Allow-Origin:*');
function main(){
    session_start();
    $connection=new mysqli("localhost","root","16113710141","show");//实例化一个MySQL链接
    if($connection->error){//判断链接是否成功
        die("connect error!");//如果失败，结束并输出一个提示信息
    }else{//如果成功执行一下信息 recordset
        if($rs=$connection->query("select * from products;")){//$connection->query("select * from students;") 返回记录集
            //query方法可用于查询更新数据库信息
            echo "{code:2000,list:[";
            while($row=$rs->fetch_assoc()){//循环遍历数据库中表内的数据，每次循环读出一条数据并赋值给$row变量，一条信息就是表中的一行信息
                echo "{ID:".$row["id"].",name:'".$row["p_name"]."',price:'".$row["p_price"]."',brand:'".$row["p_brand"]."',sales:'".$row["p_sales"]."',image:'".$row["p_image01"]."'},";
            }
            echo "]}";
        }
        $connection->close();//读取完毕以后，关闭数据库链接。目的节省数据库开销，否则数据库容易崩溃
    }
}
main();
?>
