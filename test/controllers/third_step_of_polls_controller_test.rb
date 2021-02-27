require "test_helper"

class ThirdStepOfPollsControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get third_step_of_polls_new_url
    assert_response :success
  end

  test "should get create" do
    get third_step_of_polls_create_url
    assert_response :success
  end
end
