/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License", destination); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

import { expect } from 'chai';
import { NewCamelQuarkusProjectCommand } from '../../commands/NewCamelQuarkusProjectCommand';

describe('Should validate Create a Camel Project command', function () {

	context('GAV validation', function () {

		let newCamelQuarkusProjectCommand: NewCamelQuarkusProjectCommand;

		before(async function () {
			newCamelQuarkusProjectCommand = new NewCamelQuarkusProjectCommand();
		});

		it('Validate not empty', function () {
			expect(newCamelQuarkusProjectCommand.validateGAV('')).to.not.be.undefined;
		});

		it('Validate contains 2 double-dots (basic check done by Camel JBang)', function () {
			expect(newCamelQuarkusProjectCommand.validateGAV('invalid')).to.not.be.undefined;
			expect(newCamelQuarkusProjectCommand.validateGAV('invalid:invalid')).to.not.be.undefined;
			expect(newCamelQuarkusProjectCommand.validateGAV('valid:valid:1.0-SNAPSHOT')).to.be.undefined;
		});

		it('Validate does not contain space', function () {
			expect(newCamelQuarkusProjectCommand.validateGAV('invalid:with space:1.0-SNAPSHOT')).to.not.be.undefined;
			expect(newCamelQuarkusProjectCommand.validateGAV('with space:invalid:1.0-SNAPSHOT')).to.not.be.undefined;
			expect(newCamelQuarkusProjectCommand.validateGAV('invalid:invalid:1.0- with space')).to.not.be.undefined;
		});
	});
});