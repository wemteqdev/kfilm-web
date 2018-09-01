<?php
	function passport_token()
	{
		return Auth::user()->createToken('user', Auth::user()->getRoleNames()->toArray())->accessToken;
	}