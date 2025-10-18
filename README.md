## Creating TODO list: Arttoy-preorder

### User Management
  - [ ] รองรับผู้ใช้ 2 role ได้แก่ admin และ member
  - [x] user สามารถลงทะเบียน โดยระบุ name, email, tel, role, และ password
    > Registration page มีให้ตามข้อมูลที่ต้องการข้างต้น
  - [ ] หลังการลงทะเบียน user สามารถ log in เข้าระบบด้วย email และ password โดยระบบออก JWT token เป็น user credential หลังการ log in และ user สามารถ log out ได้

  >[!Note]
  >API มีการทำ access control และ protected route ด้วย middleware

### Art Toy Management
  - [x] User ทุกคนสามารถ view ข้อมูล art toy ได้
    > Dialog จะแสดงข้อมุล arttoy
  - [ ] หลังการ login, admin user สามารถ add/update/delete/view ข้อมูล art toy โดย art toy ที่สร้างใหม่จะได้รับ id สำหรับอ้างอิงในการ update/delete ตลอดจนการจัดการการ pre-order ที่เกี่ยวข้องกับ art toy
  - [ ] ในการสร้าง art toy นั้น วัน arrival date ต้องไม่ใช่วันก่อนหน้าวันปัจจุบัน

### Pre-Order Management
  - [ ] หลัง login, member user สามารถสร้าง order ขอ pre-order สำหรับ art toy ใดก็ได้ โดยระบุ id ของ art toy ทั้งนี้ art toy pre-order request ที่สร้างใหม่จะได้รับ id สำหรับอ้างอิง โดยสามารถสร้าง art toy pre-order ขอจอง art toy ได้รวมสูงสุด 5 ชิ้นต่อ order

  >[!Important] 
  > คาดว่าจะใช้วิธีการเหมือนเพิ่ม add to cart ในหลายๆ e-commerce โดยใช้ context / redux ในการคุม state management เอาเลย ผ่านจากการส่งจากหน้า `/arttoys/` ผ่านการกดปุ่ม pre-order now 

  - [ ] member user สามารถสร้าง order ได้เพียง 1 order ต่อ 1 art toy เท่านั้น
  - [ ] หลัง login, member user สามารถ view/edit/delete order ของตนเอง
    > Init หน้า myorder แล้ว
  - [ ] หลัง login, admin user สามารถ view/edit/delete order ของ user ใดก็ได้
