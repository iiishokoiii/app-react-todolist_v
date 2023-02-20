import React from 'react';

export const FetchErrorMsg = (fetchTimeoutFlg) => (
    fetchTimeoutFlg ? (
      <p className="text-center">タイムアウトエラーです<br/>通信環境を確認いただきお試しください</p>    
    ):(
      <p className="text-center">ただいまメンテナンス中です<br/>しばらくたってお試しください</p>    
    )
  );

