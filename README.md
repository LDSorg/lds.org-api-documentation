Official API Documentation
===

I found some stuff that's legit:

* <http://tech.lds.org/wiki/LDS_Tools_Web_Services>
* <https://tech.lds.org/mobile/ldstools/config.json>

LDS.org API Documentation
===

Since there is no official API for LDS.org,
the debugger tools in Chrome are going to have to suffice.

This is just documentation for lds.org as-is.
If you want a library that you could use with
PhantomJS,
CasperJS,
or a [bookmarklet](http://bookmarkleteer.com),
see [ldsorgjs](https://github.com/LDSorg/ldsorgjs).

Feel free to edit anything that's out-of-date,
just be sure to scrub it of any personal information first.

All of the tokens expire within a few minutes and the ids
are useless unless you're logged in and have pemission to that
unit, so those you don't have to worry about scrubbing as much.

Also note that there are likely fields that a
ward, stake, or area clerk,
and bishop, stake president, or area authority
can see that an unprivileged member cannot.

And whatever you're doing - be it an iOS app or web or whatever,
be keenly aware of privacy and legal concerns.

Soon to be moved
===

At the request of a member of the Church's IT department, I will soon be moving this documentation to a separate website where password authentication with an LDS.org account is required.

I assured the person that I spoke with that there's nothing here that a non-member could access and use and also nothing here that a member with lds.org access can't figure out with the Chrome debugger, however, I don't want to make a big deal out of it... meh...

Overview & Playground
===

  * [LDS Directory](#overview--playground)
  * [Church Calendar](https://github.com/LDSorg/lds.org-api-documentation/blob/master/calendar.md)
  * [RC Maps](https://github.com/LDSorg/lds.org-api-documentation/blob/master/maps.md)

Go log into [LDS.org/directory](https://www.lds.org/directory)
and then start clicking on these links below to see what the api looks like.

I'd also recommend installing the Chrome Plugin
[JSONView](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc)
for easy formatting of the data.

  * [LDS.org](https://www.lds.org/)
    * Directory - [lds.org/directory/services/ludrs](https://www.lds.org/directory/services/ludrs/)
      * Version - [/util/ver/](https://www.lds.org/directory/services/ludrs/util/ver/)
      * Locale - [/userLocale/](https://www.lds.org/directory/services/ludrs/page/userLocale/)
      * Page Translation - [/page/str/index](https://www.lds.org/directory/services/ludrs/page/str/index)
      * Ward Metadata - [/unit/current-user-ward-stake/](https://www.lds.org/directory/services/ludrs/unit/current-user-ward-stake/)
      * Stake Metadata - [/unit/current-user-units/](https://www.lds.org/directory/services/ludrs/unit/current-user-units/)
      * ~~User Id - [/mem/current-user-id/](https://www.lds.org/directory/services/ludrs/mem/current-user-id/)~~
      * User Info - [/mem/current-user-info/](https://www.lds.org/directory/services/ludrs/mem/current-user-info/)
      * Approved Photo - [/mem/currentUserHasApprovedPhoto/](https://www.lds.org/directory/services/ludrs/mem/currentUserHasApprovedPhoto/)
      * Ward Member List - [/mem/member-list/#{unit_number}](https://www.lds.org/directory/services/ludrs/mem/member-list/#{unit_number})
      * Ward Photo List - [/mem/wardDirectory/photos/#{unit_number}](https://www.lds.org/directory/services/ludrs/mem/wardDirectory/photos/#{unit_number})
          * `unit_number` is found in [`/unit/current-user-ward-stake/`](https://www.lds.org/directory/services/ludrs/unit/current-user-ward-stake/) and [`/unit/current-user-units/`](https://www.lds.org/directory/services/ludrs/unit/current-user-units/)
      * Map - [/mem/map/#{head_of_house_individual_id}](https://www.lds.org/directory/services/ludrs/mem/map/#{head_of_house_individual_id})
      * Household - [/mem/householdProfile/#{head_of_house_individual_id}](https://www.lds.org/directory/services/ludrs/mem/householdProfile/#{head_of_house_individual_id})
          * `#{head_of_house_individual_id}` is found in `/mem/member-list/#{ward_unit_no}`
      * Individual Photos - [/photo/url/#{id_1},#{id_2},#{id_x}/individual](https://www.lds.org/directory/services/ludrs/photo/url/#{id_1},#{id_2},#{id_x}/individual)
          * member ids
      * Ward Leadership Positions & Groups (Callings)
          * List of Position Groups
              * https://www.lds.org/directory/services/ludrs/1.1/unit/ward-leadership-positions/#{ward_unit_no}/true
              * https://www.lds.org/directory/services/ludrs/1.1/unit/ward-leadership-positions/#{ward_unit_no}/false (deprecated) (false)
          * List of the Called
              * https://www.lds.org/directory/services/ludrs/1.1/unit/stake-leadership-group-detail/#{ward_unit_no}/#{group_key}/#{instance} (not a typo, it says stake, but it's also for wards)
      * Ward Organizations
          * Categories: `["HIGH_PRIEST", "ELDER", "RELIEF_SOCIETY", "PRIEST", "TEACHER", "DEACON", "LAUREL", "MIA_MAID", "BEEHIVE", "ADULTS"]`
          * https://www.lds.org/directory/services/ludrs/1.1/unit/roster/#{ward_unit_no}/#{organization}
          * **Note on Adults**: This group is all adults. Remember that a newly baptized 50-year-old man may not yet have the priesthood or may be in the office of a priest (typically 16 year-olds).
      * Stake Leadership Positions & Groups
            * https://www.lds.org/directory/services/ludrs/1.1/unit/stake-leadership-positions/#{stake_unit_no}
            * https://www.lds.org/directory/services/ludrs/1.1/unit/stake-leadership-group-detail/#{stake_unit_no}/#{group_key}/#{instance}

      * Missionaries
          * https://www.lds.org/directory/services/ludrs/missionary/missionaryInfo/#{ward_unit_no}/
          * https://www.lds.org/directory/services/ludrs/missionary/missionaryDetail/24587980515/21067/
          * https://www.lds.org/directory/services/ludrs/missionary/missionaryPhoto/24587980515/

      * Maps
        * https://www.lds.org/rcmaps/services/user/context.json?lang=eng - some sort of current user context

Note that fields preceded by colons, such as `#{unit_number}`
require an id that you'd get from another resource.

LDS.org Directory
===

Documentation for the LDS.org Directory based on web debugger inspection.

<https://www.lds.org>

Version
---

    GET /directory/services/ludrs/util/ver/

Current Area, Stake, & Ward MetaData
---

All wards are listed as the stake

    GET /directory/services/ludrs/unit/current-user-ward-stake/

```javascript
    {
        "areaUnitNo": 777777,
        "branch": false,
        "district": false,
        "mission": false,
        "newPhotoCount": -1,
        "stake": true,
        "stakeName": "Provo Utah YSA 0th Stake",
        "stakeUnitNo": 555555,
        "userHasStakeAdminRights": false,
        "userHasWardAdminRights": false,
        "userHasWardCalling": false,
        "usersHomeWard": true,
        "ward": true,
        "wardName": "Provo YSA 300th Ward",
        "wardUnitNo": 444444
    }
```

Stakes in Area & Wards in Stake
---

Contains an array of stakes, but lacks the area meta data.

    GET /directory/services/ludrs/unit/current-user-units/

```javascript
    [
      {
        "district": false,
        "mission": false,
        "stake": true,
        "stakeName": "Provo Utah YSA 0th Stake",
        "stakeUnitNo": 555555,
        "userHasStakeAdminRights": false,
        "wards": [
            {
              "areaUnitNo": 777777,
              "branch": false,
              "district": false,
              "mission": false,
              "newPhotoCount": -1,
              "stake": true,
              "stakeName": "Provo Utah YSA 0th Stake",
              "stakeUnitNo": 555555,
              "userHasStakeAdminRights": false,
              "userHasWardAdminRights": false,
              "userHasWardCalling": false,
              "usersHomeWard": true,
              "ward": true,
              "wardName": "Provo YSA 300th Ward",
              "wardUnitNo": 444444
            }
        ]
      }
    ]
```

The `current-user-units` will be a collection of wards and / or branches of the currently logged-in user.

Households in Ward
---

Individual wards contain the list of members

    GET /directory/services/ludrs/mem/member-list/#{ward_unit_no}

**WARNING** **BUG** `headOfHouseIndividualId` and `householdInfo.individualId` refer to the LDS church member in the household if the household/family is of mixed faith (**part-member family**). It may refer to the spouse or even an other/child. `headOfHouse` and `headOfHousehold` are misnomers. They will sometimes refer to the non-member head or the spouse or a child.

**Note** The husband and wife may have distinct last names... so try to go with `surname` when making ad-hoc ids, even if it's the wrong last name for that person.

```javascript
    [
        {
          "children": [],
          "coupleName": "Doe, John",
          "headOfHouse": {
            "directoryName": "Doe, John",
            "gender": "MALE",
            "individualId": 3333333333,
            "latinName": "Doe",
            "latinNameDifferent": false,
            "preferredName": "Doe, John",
            "surname": "Doe"
          },
          "headOfHouseIndividualId": 3333333333,
          "householdName": "Doe",
          "isProfilePrivate": false,
          "spouse": {
            "directoryName": "",
            "gender": "",
            "individualId": -1,
            "latinName": "",
            "latinNameDifferent": true,
            "preferredName": "",
            "surname": ""
          }
        }
    ]
```

Family Photos in Ward
---

The photos and phone numbers are already available in the household resource.

I'm not sure if any of the phone number, photo, or household name are actually different,
so this resource may be entirely unnecessary.

  * headOfHousehold.photoUrl (individual photo)
  * householdInfo.photoUrl (entire family photo)

The family phone number and family photo can be accessed like so

    GET /directory/services/ludrs/mem/wardDirectory/photos/#{ward_unit_no}

```javascript
    [
        {
          "householdId": 3333333333,
          "householdName": "Doe, John",
          "phoneNumber": "555-726-3117",
          "photoUrl": "/bcs/content?token=6zr5CJL5hQ7QdxHZZp8LG_aKQWafJ8x0V8gyTExIvoEZcCmlBICSabVO7rF7JIOR6y94HWsYKNCtilHK6fJTfwTT-mR0SV8_jKm7lRcobsfgpDnVHl3_EV1z3Ysnj30EZIHQ7EbIxXE6zzY-d_9x5W43mrnJJI-N%3dt_U1ZvJ4jZiRhx7S8KlE%3dXWMv0Vbv6i1ySrWhMTlqK6EQbhhqG0MsWNUtM4PsG%3d%3dvIlgKoLQFWgCHX5A9k_nix9iPPZezcE8BoobjcsJ2WTXlKF7WnC7hsu"
        }
    ]
```
    
Note that in YSA wards the family phone number and family photo are often the individuals photo,
but since there's de facto convention and either could be out of sync, try both.

Household & Members / Individuals in Household
---

The **individual photo** is `headOfHousehold.photoUrl`.

The **family photo** is `householdInfo.photoUrl` (and I can confirm it's different from the above).

The **individual phone number** is `headOfHousehold.phone`.

The **family phone number** is `householdInfo.phone` (but I'm not sure if it's different).

    GET /directory/services/ludrs/mem/householdProfile/#{head_of_house_individual_id}

**WARNING** **BUG** `headOfHouseIndividualId` and `householdInfo.individualId` refer to the LDS church member in the household if the household/family is of mixed faith (**part-member family**). It may refer to the spouse or even an other/child. `headOfHouse` and `headOfHousehold` are misnomers. They will sometimes refer to the non-member head or the spouse or a child.

**Note** The husband and wife may have distinct last names... so try to go with `surname` when making ad-hoc ids, even if it's the wrong last name for that person.

```javascript
    {
      "canViewMapLink": true,
      "hasEditRights": true,
      "headOfHousehold": {
        "address": null,
        "addressLevel": null,
        "birthDateLevel": "WARD",
        "email": "john.doe@gmail.com",
        "emailLevel": "STAKE",
        "imageId": "51963879243749023320-eng",
        "imageLevel": "STAKE",
        "individualId": 3333333333,
        "isAllPrivate": false,
        "mapLevel": null,
        "masterLevel": null,
        "name": "Doe, John",
        "phone": "555-726-3117",
        "phoneLevel": "STAKE",
        "photoUrl": "/bcs/content?token=uDglPJ4yUAOSRRcKZLwOSfCRPTmeIooHisTFIVpJj4YZcCmlBICSabVO7rF7JIOR6y94HWwYKNCti1HK6g7oigXS-np0SV8_jKm7lRcobsfgpDnVHl3_EV1z3Ysnj30EZIHQ7EbIxXE6zzY-d_9x5W43mrnJJI-N%3dt_U1ZvJ4jZiRhx7S8KlE%3dTYMwkVbf5n2SSrpfwUqJK6EQbhhqG0MsWNUtM4PsG%3d%3dvILfM9LClvgCHXOBdh6zRx2cyHZek1R7io4bjcsJ2WTXlKF7WnC7hsu"
      },
      "householdInfo": {
        "address": {
          "addr1": "750 W 1700 N Apt 1",
          "addr2": "Provo, Utah 84604",
          "addr3": "",
          "addr4": "",
          "addr5": "",
          "city": "Provo",
          "countryCode": 251,
          "countryIsoAlphaCode": "USA",
          "district": "",
          "groupId": 1670219,
          "latitude": 40.2599249,
          "locallyVerifiedCode": "",
          "longitude": -111.6556598,
          "postal": "84604",
          "state": "Utah",
          "stateCode": 44,
          "streetAddr1": "750 W 1700 N Apt 1",
          "streetAddr2": ""
        },
        "addressLevel": "STAKE",
        "birthDateLevel": null,
        "email": "john.doe@gmail.com",
        "emailLevel": "STAKE",
        "imageId": "72558875098790051910-eng",
        "imageLevel": "STAKE",
        "individualId": 3333333333,
        "isAllPrivate": false,
        "mapLevel": "STAKE",
        "masterLevel": "STAKE",
        "name": "Doe",
        "phone": "555-726-3117",
        "phoneLevel": "STAKE",
        "photoUrl": "/bcs/content?token=vTklO9Elgg2mSRgKPcAAHy%3dAR0dyIr0GVvkuT1S4jo5ZcCmlBICSabVO7rF7JIOR6y94HWwYKNCti1HK5BSohf_SCmh0SV8_jKm7lRcobsfgpDnVHl3_EV1z3Ysnj30EZIHQ7EbIxXE6zzY-d_9x5W43mrnJJI-N%3dt_U1ZvJ4jZiRhx7S8KlE%3dXWMv0Vbv6i1ySrWhMTlqK6EQbhhqG0MsWNUtM4PsG%3d%3dvIlgKoLQFWgCHX5A9k_nix9iPPZezcE8BoobjcsJ2WTXlKF7WnC7hsu"
      },
      "id": 0,
      "inWard": true,
      "isEuMember": false,
      "otherHouseholdMembers": [],
      "spouse": null,
      "ward": {
        "areaUnitNo": 777777,
        "branch": false,
        "district": false,
        "mission": false,
        "stake": true,
        "stakeName": "Provo Utah YSA 0th Stake",
        "stakeUnitNo": 555555,
        "ward": true,
        "wardName": "Provo YSA 300th Ward",
        "wardUnitNo": 444444
      }
    }
```

Map of Household
---

You can build the urlLink yourself,
so this resource may be entirely unnecessary.

    GET /directory/services/ludrs/mem/map/#{head_of_house_individual_id}

```javascript
    {
      "urlLink": "https://lds.org/rcmaps/#x=ward&ward=12345&id=household:1234567890"
    }
```

Member
---

There are no individual records accessible via the Directory. Only household and head of household.

Phone Numbers are only visible via the photos resource.

The only individual data is about the current user.

    GET /directory/services/ludrs/mem/current-user-info/
    
```javascript
{ "individualId": 999999999
, "newOption2User": false
}
```

    GET /directory/services/ludrs/page/userLocale/

Changing your phone number (requires verification):

    POST https://ldsaccount.lds.org/protected/contact-info/
    
    _tk=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
    &pendingAction=
    &personalInfo.email.value=johndoe%40gmail.com
    &personalInfo.altEmail.value=
    &memberInfo.directoryIndividualEmail.email=johndoe%40gmail.com
    &memberInfo.directoryIndividualEmail.privacyLevel=STAKE
    &personalInfo.sms.country=USA
    &personalInfo.sms.number=8015550123
    &accountRecovery.mrnRecoveryAllowed=true
    &_accountRecovery.mrnRecoveryAllowed=on
    
Changing your username / display name:

    POST https://ldsaccount.lds.org/protected/account
    
    _tk=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
    &requireParentalConsent=false
    &parentalConsentType=
    &parentalConsentSms=
    &parentalConsentCountryCode=
    &parentalConsentEmail=
    &parentalConsentMrn=
    &userAccountInfo.userName=johndoe
    &userAccountInfo.displayName=J.T. Doe
    &userAccountInfo.personalInfo.preferredLanguage=en
    
### Photo Upload

The flash uploader tool does some image manipulation on the file you upload
and actually produces 3 separate files which are uploaded to the server.

Despite the name, the *original* version is **not** the true original.
Although I was able to capture a HAR file of the upload,
the jpeg binary got messed up in the utf-8 conversion
and I wasn't able to decode it.

What I do know however is that when you upload the recommended 500x375 image (4:3),
it is downsized to 200x150 (4:3) for family photos and perhaps 100x? for individual photos.
I also know that lds.org uses a 40x40 thumbnail.

My *guess* is that compression is increased on the original size image,
the image is scaled to whatever fits best in the bounds of 200x150
and then (intelligently?) cropped to 40x40
(or at least it seems to do a good job of getting the face).

    POST /directory/services/ludrs/photo/upload/#{individual_id}/household/#{ward_unit_no}}/#{stake_unit_no}/#{area_unit_no}

    name="file0"; filename="original_#{picname}.jpg"
    name="file1"; filename="medium_#{picname}.jpg" 200x150 (height is exactly 150, width may be up to 150 or 200)
    name="file2"; filename="thumbnail_#{picname}.jpg" 40x40 ()

```javascript
    {"good":true,"message":""}
```

Seen in the wild:

 * `largeUri`: 375x375 (14926 b), 226x375
 * `mediumUri`: 150x150 (4220 b), 90x150
 * `thumbnailUri`: 40x40 (1076 b), 24x40
 * `originalUri`: redirects to 404

The reason for listing the size is so that I can later estimate the jpeg compression used. The original 375x375 image was around 58kb, so the quality is obviously being lowered a bit, in addition to the resolution change. The size difference would suggest that the jpeg quality was reduced to something in the range of 15% to 20%.

Approved Photo
---

Let's you know whether or not the ward clerk has approved a photo uploaded by you (the logged in individual).

    GET /mem/currentUserHasApprovedPhoto/

```javascript
    { "good": true
    , "message": "true"
    }
```

Ward Leadership
---

Note that the key **`instance`** probably refers to Provo wards where there's 2 Relief Societies.
I'm not sure.

### Positions (to be filled)

    GET https://www.lds.org/directory/services/ludrs/1.1/unit/ward-leadership-positions/#{ward_unit_no}/true

```javascript
{
    "unitLeadership": [
        {
            "groupKey": 1185,
            "groupName": "Other Callings",
            "instance": 1,
            "positions": [
                {
                    "positionId": 0,
                    "positionName": "Ward Google Group Specialist"
                }
            ]
        }
    ],
    "wardLeadership": [
        {
            "groupKey": 1185,
            "groupName": "Other Callings",
            "instance": 1,
            "positions": [
                {
                    "positionId": 0,
                    "positionName": "Ward Google Group Specialist"
                }
            ]
        }
    ]
}
```

### Positions (false) (probably useless)

    GET https://www.lds.org/directory/services/ludrs/1.1/unit/ward-leadership-positions/#{ward_unit_no}/false

Seems like supplying `false` just changes the name of `wardLeadership` to `stakeLeadership`,
probably just a bugfix of a time long gone.

```javascript
{
    "stakeLeadership": [
        {
            "groupKey": 1185,
            "groupName": "Other Callings",
            "instance": 1,
            "positions": [
                {
                    "positionId": 0,
                    "positionName": "Ward Google Group Specialist"
                }
            ]
        }
    ],
    "unitLeadership": [
        {
            "groupKey": 1185,
            "groupName": "Other Callings",
            "instance": 1,
            "positions": [
                {
                    "positionId": 0,
                    "positionName": "Ward Google Group Specialist"
                }
            ]
        }
    ]
}
```

### Groups (the called and chosen)

    GET https://www.lds.org/directory/services/ludrs/1.1/unit/stake-leadership-group-detail/#{ward_unit_no}/#{group_key}/#{instance}

**Note**: It's `stake-leadership-group-detail`, but it applies to wards.

```javascript
{
    "leaders": [
        {
            "callingName": "Stake President",
            "displayName": "John Doe",
            "email": "john.doe@ucsf.edu",
            "householdPhoneNumber": "555-222-7777",
            "individualId": 19670054124,
            "phoneNumber": "444-222-7777",
            "photoUri": "",
            "positionId": 1
        },
    ],
    "unitName": "San Francisco California West Stake"
}
```

Stake Leadership
---

### Positions (to be filled)

    GET https://www.lds.org/directory/services/ludrs/1.1/unit/stake-leadership-positions/#{stake_unit_no}

```javascript
{
    "stakeLeadership": [
        {
            "groupKey": 1186,
            "groupName": "Stake Presidency",
            "instance": 1,
            "positions": [
                {
                    "positionId": 803,
                    "positionName": "Stake Assistant Clerk--Technology Specialist"
                }
            ]
        }
    ],
    "unitLeadership": [
        {
            "groupKey": 1186,
            "groupName": "Stake Presidency",
            "instance": 1,
            "positions": [
                {
                    "positionId": 803,
                    "positionName": "Stake Assistant Clerk--Technology Specialist"
                }
            ]
        }
    ]
}
```

### Groups (of called individuals)

    GET https://www.lds.org/directory/services/ludrs/1.1/unit/stake-leadership-group-detail/#{stake_unit_no}/#{group_key}/#{instance}

```javascript
{
    "leaders": [
        {
            "callingName": "Stake President",
            "displayName": "John Doe",
            "email": "john.doe@ucsf.edu",
            "householdPhoneNumber": "555-222-7777",
            "individualId": 19670054124,
            "phoneNumber": "444-222-7777",
            "photoUri": "",
            "positionId": 1
        },
    ],
    "unitName": "San Francisco California West Stake"
}
```
