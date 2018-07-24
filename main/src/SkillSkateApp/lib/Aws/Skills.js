'use strict'

import AWSConstants from './constants';

var AwsLambdaService = require('./lambda');

export default class SkillsClass {

  async list() {
    var _params = {
        dbOperation:'GETLIST',
        dbObject : {}            
    };
    let result = await AwsLambdaService.invokeAsync(AWSConstants._AWS_DBMNG_SKILLLEVEL, _params);
    let data = await result.json();

    return data;
  } 

}